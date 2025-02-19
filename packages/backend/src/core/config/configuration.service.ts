import fs from 'node:fs';
import path from 'node:path';
import type { PartialUserSettingsDto } from '@/app.dto';
import { APP_DATA_DIR, APP_DIR, DATA_DIR } from '@/common/constants';
import { TranslatableError } from '@/common/error/translatable-error';
import { EnvUtils } from '@/modules/env/env.utils';
import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import { z } from 'zod';

export const ARCHITECTURES = ['arm64', 'amd64'] as const;
export type Architecture = (typeof ARCHITECTURES)[number];

const envSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_DBNAME: z.string(),
  POSTGRES_USERNAME: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.string().transform(Number),
  ARCHITECTURE: z.enum(ARCHITECTURES).default('amd64'),
  INTERNAL_IP: z.string(),
  TIPI_VERSION: z.string(),
  JWT_SECRET: z.string(),
  APPS_REPO_ID: z.string(),
  APPS_REPO_URL: z.string(),
  DOMAIN: z.string(),
  LOCAL_DOMAIN: z.string(),
  DNS_IP: z.string().default('9.9.9.9'),
  RUNTIPI_APP_DATA_PATH: z.string(),
  DEMO_MODE: z.string().transform((val) => val.toLowerCase() === 'true'),
  GUEST_DASHBOARD: z.string().transform((val) => val.toLowerCase() === 'true'),
  ALLOW_ERROR_MONITORING: z.string().transform((val) => val.toLowerCase() === 'true'),
  ALLOW_AUTO_THEMES: z.string().transform((val) => val.toLowerCase() === 'true'),
  PERSIST_TRAEFIK_CONFIG: z.string().transform((val) => val.toLowerCase() === 'true'),
  LOG_LEVEL: z.string().default('info'),
  TZ: z.string(),
  ROOT_FOLDER_HOST: z.string(),
  NGINX_PORT: z.string().default('80').transform(Number),
  NGINX_PORT_SSL: z.string().default('443').transform(Number),
});

@Injectable()
export class ConfigurationService {
  private config: ReturnType<typeof this.configure>;
  private envPath = path.join(DATA_DIR, '.env');

  // Lowest level, cannot use any other service or module to avoid circular dependencies
  constructor(private readonly envUtils: EnvUtils) {
    dotenv.config({ path: this.envPath });
    this.config = this.configure();
  }

  private configure() {
    let envFile = '';
    try {
      envFile = fs.readFileSync(this.envPath).toString();
    } catch (e) {
      console.error('❌ .env file not found');
    }

    const envMap = this.envUtils.envStringToMap(envFile.toString());
    const conf = { ...Object.fromEntries(envMap), ...process.env } as Record<string, string>;

    const env = envSchema.safeParse(conf);

    if (!env.success) {
      console.error(env.error.errors);
      throw new Error(`❌ Invalid environment variables ${JSON.stringify(env.error.flatten(), null, 2)}`);
    }

    return {
      database: {
        host: env.data.POSTGRES_HOST,
        port: env.data.POSTGRES_PORT,
        username: env.data.POSTGRES_USERNAME,
        password: env.data.POSTGRES_PASSWORD,
        database: env.data.POSTGRES_DBNAME,
      },
      directories: {
        dataDir: DATA_DIR,
        appDataDir: APP_DATA_DIR,
        appDir: APP_DIR,
      },
      logLevel: env.data.LOG_LEVEL,
      version: env.data.TIPI_VERSION,
      userSettings: {
        allowAutoThemes: env.data.ALLOW_AUTO_THEMES,
        allowErrorMonitoring: env.data.ALLOW_ERROR_MONITORING,
        demoMode: env.data.DEMO_MODE,
        guestDashboard: env.data.GUEST_DASHBOARD,
        timeZone: env.data.TZ,
        domain: env.data.DOMAIN,
        localDomain: env.data.LOCAL_DOMAIN,
        port: env.data.NGINX_PORT || 80,
        sslPort: env.data.NGINX_PORT_SSL || 443,
        listenIp: env.data.INTERNAL_IP, // TODO: Check if this is correct
        internalIp: env.data.INTERNAL_IP,
        appsRepoUrl: env.data.APPS_REPO_URL,
        postgresPort: env.data.POSTGRES_PORT,
        dnsIp: env.data.DNS_IP,
        appDataPath: env.data.RUNTIPI_APP_DATA_PATH, // TODO: Check how it's used
        persistTraefikConfig: env.data.PERSIST_TRAEFIK_CONFIG,
      },
      appsRepoId: env.data.APPS_REPO_ID,
      appsRepoUrl: env.data.APPS_REPO_URL,
      architecture: env.data.ARCHITECTURE,
      demoMode: env.data.DEMO_MODE,
      rootFolderHost: env.data.ROOT_FOLDER_HOST,
      envFilePath: this.envPath,
      internalIp: env.data.INTERNAL_IP,
      jwtSecret: env.data.JWT_SECRET,
    };
  }

  public getConfig() {
    return this.config;
  }

  public get<T extends keyof ReturnType<typeof this.configure>>(key: T) {
    return this.config[key];
  }

  public async setUserSettings(settings: PartialUserSettingsDto) {
    if (this.config.demoMode) {
      throw new TranslatableError('SERVER_ERROR_NOT_ALLOWED_IN_DEMO');
    }

    await fs.promises.writeFile(`${DATA_DIR}/state/settings.json`, JSON.stringify(settings, null, 2));

    this.config.userSettings = {
      ...this.config.userSettings,
      ...settings,
    };
  }
}
