import 'reflect-metadata';
import 'source-map-support/register';

import { type SystemEvent, cleanseErrorData } from '@runtipi/shared';

import path from 'node:path';
import { logger } from '@/lib/logger';
import { copySystemFiles, generateSystemEnvFile, generateTlsCertificates } from '@/lib/system';
import { serve } from '@hono/node-server';
import type { ICache } from '@runtipi/cache';
import type { IMigrator } from '@runtipi/db';
import type { ILogger } from '@runtipi/shared/node';
import { extraErrorDataIntegration } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { Queue } from 'bullmq';
import { Hono } from 'hono';
import { setupRoutes } from './api';
import { APP_DIR, DATA_DIR } from './config';
import { container } from './inversify.config';
import { socketManager } from './lib/socket';
import { RepoExecutors } from './services';
import type { IAppExecutors } from './services/app/app.executors';
import { startWorker } from './watcher/watcher';

const envFile = path.join(DATA_DIR, '.env');

const setupSentry = (release?: string) => {
  Sentry.init({
    release,
    environment: process.env.NODE_ENV,
    dsn: 'https://1cf49526d2efde9f82b6584c9c0f6912@o4504242900238336.ingest.sentry.io/4506360656035840',
    beforeSend: cleanseErrorData,
    includeLocalVariables: true,
    initialScope: {
      tags: { version: release },
    },
    integrations: [
      Sentry.localVariablesIntegration({
        captureAllExceptions: true,
      }),
      extraErrorDataIntegration,
    ],
  });
};

const main = async () => {
  try {
    // TODO: Convert to class with injected dependencies
    const logger = container.get<ILogger>('ILogger');
    const migrator = container.get<IMigrator>('IMigrator');
    const appExecutor = container.get<IAppExecutors>('IAppExecutors');
    const cache = container.get<ICache>('ICache');

    await logger.flush();

    logger.info(`Running tipi-worker version: ${process.env.TIPI_VERSION}`);
    logger.info('Generating system env file...');
    const envMap = generateSystemEnvFile();

    logger.info('Copying system files...');
    await copySystemFiles(envMap);

    if (envMap.get('ALLOW_ERROR_MONITORING') === 'true' && process.env.NODE_ENV === 'production' && process.env.LOCAL !== 'true') {
      logger.info(
        `Anonymous error monitoring is enabled, to disable it add "allowErrorMonitoring": false to your settings.json file. Version: ${process.env.TIPI_VERSION}`,
      );
      setupSentry(process.env.TIPI_VERSION);
    }

    logger.info('Generating TLS certificates...');
    await generateTlsCertificates({ domain: envMap.get('LOCAL_DOMAIN') });

    socketManager.init();

    const repoExecutors = new RepoExecutors();

    const clone = await repoExecutors.cloneRepo(envMap.get('APPS_REPO_URL') as string);
    if (!clone.success) {
      logger.error(`Failed to clone repo ${envMap.get('APPS_REPO_URL') as string}`);
    }

    if (process.env.NODE_ENV !== 'development') {
      const pull = await repoExecutors.pullRepo(envMap.get('APPS_REPO_URL') as string);
      if (!pull.success) {
        logger.error(`Failed to pull repo ${envMap.get('APPS_REPO_URL') as string}`);
      }
    }

    logger.info('Starting queue...');
    const queue = new Queue('events', {
      connection: cache.getClient(),
    });
    const repeatQueue = new Queue('repeat', {
      connection: cache.getClient(),
    });
    logger.info('Obliterating queue...');
    await queue.drain();
    await queue.obliterate({ force: true });
    await repeatQueue.obliterate({ force: true });

    // Scheduled jobs
    if (process.env.NODE_ENV === 'production') {
      logger.info('Adding scheduled jobs to queue...');
      await repeatQueue.add(
        `${Math.random().toString()}_repo_update`,
        { type: 'repo', command: 'update', url: envMap.get('APPS_REPO_URL') } as SystemEvent,
        { repeat: { pattern: '*/30 * * * *' } },
      );
    }

    logger.info('Closing queue...');
    await queue.close();
    await repeatQueue.close();

    logger.info('Running database migrations...');

    await migrator.runPostgresMigrations({
      host: envMap.get('POSTGRES_HOST') as string,
      database: envMap.get('POSTGRES_DBNAME') as string,
      username: envMap.get('POSTGRES_USERNAME') as string,
      password: envMap.get('POSTGRES_PASSWORD') as string,
      port: Number(envMap.get('POSTGRES_PORT')),
      migrationsFolder: path.join(APP_DIR, 'assets'),
    });

    // Set status to running
    logger.info('Setting status to running...');
    await cache.set('status', 'RUNNING');

    // Start all apps
    logger.info('Starting all apps...');

    // Fire and forget
    void appExecutor.startAllApps();

    const app = new Hono().basePath('/worker-api');
    serve({ fetch: app.fetch, port: 5000 }, (info) => {
      startWorker();

      setupRoutes(app);
      logger.info(`Listening on http://localhost:${info.port}`);
    });
  } catch (e) {
    Sentry.captureException(e);
    logger.error('Failed to start');

    if (e instanceof Error) {
      logger.error(e.stack);
    }

    setTimeout(() => {
      process.exit(1);
    }, 2000);
  }
};

void main();
