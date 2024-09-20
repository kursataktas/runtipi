import dotenv from 'dotenv';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { APP_DATA_DIR, APP_DIR, DATA_DIR } from '@/config/constants';
import { envMapToString, envStringToMap, settingsSchema } from '@runtipi/shared';
import { execAsync, pathExists } from '@runtipi/shared/node';
import { getRepoHash } from '../../services/repo/repo.helpers';
import { logger } from '../logger/logger';

type EnvKeys =
  | 'APPS_REPO_ID'
  | 'APPS_REPO_URL'
  | 'TZ'
  | 'INTERNAL_IP'
  | 'DNS_IP'
  | 'ARCHITECTURE'
  | 'TIPI_VERSION'
  | 'JWT_SECRET'
  | 'ROOT_FOLDER_HOST'
  | 'NGINX_PORT'
  | 'NGINX_PORT_SSL'
  | 'DOMAIN'
  | 'RUNTIPI_APP_DATA_PATH'
  | 'POSTGRES_PORT'
  | 'POSTGRES_HOST'
  | 'POSTGRES_DBNAME'
  | 'POSTGRES_PASSWORD'
  | 'POSTGRES_USERNAME'
  | 'REDIS_HOST'
  | 'REDIS_PASSWORD'
  | 'LOCAL_DOMAIN'
  | 'DEMO_MODE'
  | 'GUEST_DASHBOARD'
  | 'TIPI_GID'
  | 'TIPI_UID'
  | 'ALLOW_ERROR_MONITORING'
  | 'PERSIST_TRAEFIK_CONFIG'
  | 'ALLOW_AUTO_THEMES'
  | (string & {});

const OLD_DEFAULT_REPO_URL = 'https://github.com/meienberger/runtipi-appstore';
export const DEFAULT_REPO_URL = 'https://github.com/runtipi/runtipi-appstore';

/**
 * Reads and returns the generated seed
 */
const getSeed = (): string => {
  const seedFilePath = path.join(DATA_DIR, 'state', 'seed');
  if (!fs.existsSync(seedFilePath)) {
    throw new Error('Seed file not found');
  }
  return fs.readFileSync(seedFilePath, 'utf-8');
};

/**
 * Derives a new entropy value from the provided entropy and the seed
 * @param {string} entropy - The entropy value to derive from
 */
const deriveEntropy = (entropy: string): string => {
  const seed = getSeed();
  const hmac = crypto.createHmac('sha256', seed);
  hmac.update(entropy);
  return hmac.digest('hex');
};

/**
 * Generates a random seed if it does not exist yet
 */
const generateSeed = () => {
  const seedFilePath = path.join(DATA_DIR, 'state', 'seed');
  if (!fs.existsSync(seedFilePath)) {
    const randomBytes = crypto.randomBytes(32);
    const seed = randomBytes.toString('hex');
    fs.writeFileSync(seedFilePath, seed);
  }
};

/**
 * Returns the architecture of the current system
 */
const getArchitecture = () => {
  const arch = os.arch();

  if (arch === 'arm64') return 'arm64';
  if (arch === 'x64') return 'amd64';

  throw new Error(`Unsupported architecture: ${arch}`);
};

/**
 * Generates a valid .env file from the settings.json file
 */

export const generateSystemEnvFile = (): Map<EnvKeys, string> => {
  fs.mkdirSync(path.join(DATA_DIR, 'state'), { recursive: true });
  const settingsFilePath = path.join(DATA_DIR, 'state', 'settings.json');
  const envFilePath = path.join(DATA_DIR, '.env');

  if (!fs.existsSync(envFilePath)) {
    fs.writeFileSync(envFilePath, '');
  }

  const envFile = fs.readFileSync(envFilePath, 'utf-8');

  const envMap: Map<EnvKeys, string> = envStringToMap(envFile);
  envMap.set('NODE_ENV', process.env.NODE_ENV || 'production');

  if (!fs.existsSync(settingsFilePath)) {
    fs.writeFileSync(settingsFilePath, JSON.stringify({}));
  }

  const settingsFile = fs.readFileSync(settingsFilePath, 'utf-8');

  const settings = settingsSchema.safeParse(JSON.parse(settingsFile));

  if (!settings.success) {
    throw new Error(`Invalid settings.json file: ${settings.error.message}`);
  }

  generateSeed();

  const { data } = settings;

  if (data.appsRepoUrl === OLD_DEFAULT_REPO_URL) {
    data.appsRepoUrl = DEFAULT_REPO_URL;
  }

  const jwtSecret = envMap.get('JWT_SECRET') || deriveEntropy('jwt_secret');
  const repoId = getRepoHash(data.appsRepoUrl || envMap.get('APPS_REPO_URL') || DEFAULT_REPO_URL);

  const rootFolderHost = envMap.get('ROOT_FOLDER_HOST');
  const internalIp = envMap.get('INTERNAL_IP');

  if (!rootFolderHost) {
    throw new Error('ROOT_FOLDER_HOST not set in .env file');
  }

  if (!internalIp) {
    throw new Error('INTERNAL_IP not set in .env file');
  }

  envMap.set('APPS_REPO_ID', repoId);
  envMap.set('APPS_REPO_URL', data.appsRepoUrl || envMap.get('APPS_REPO_URL') || DEFAULT_REPO_URL);
  envMap.set('TZ', data.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone);
  envMap.set('INTERNAL_IP', data.listenIp || internalIp);
  envMap.set('DNS_IP', data.dnsIp || envMap.get('DNS_IP') || '9.9.9.9');
  envMap.set('ARCHITECTURE', getArchitecture());
  envMap.set('JWT_SECRET', jwtSecret);
  envMap.set('DOMAIN', data.domain || envMap.get('DOMAIN') || 'example.com');
  envMap.set('RUNTIPI_APP_DATA_PATH', data.appDataPath || envMap.get('RUNTIPI_APP_DATA_PATH') || rootFolderHost);
  envMap.set('POSTGRES_HOST', 'runtipi-db');
  envMap.set('POSTGRES_DBNAME', 'tipi');
  envMap.set('POSTGRES_USERNAME', 'tipi');
  envMap.set('POSTGRES_PORT', String(5432));
  envMap.set('REDIS_HOST', 'runtipi-redis');
  envMap.set('DEMO_MODE', typeof data.demoMode === 'boolean' ? String(data.demoMode) : envMap.get('DEMO_MODE') || 'false');
  envMap.set('GUEST_DASHBOARD', typeof data.guestDashboard === 'boolean' ? String(data.guestDashboard) : envMap.get('GUEST_DASHBOARD') || 'false');
  envMap.set('LOCAL_DOMAIN', data.localDomain || envMap.get('LOCAL_DOMAIN') || 'tipi.lan');
  envMap.set(
    'ALLOW_AUTO_THEMES',
    typeof data.allowAutoThemes === 'boolean' ? String(data.allowAutoThemes) : envMap.get('ALLOW_AUTO_THEMES') || 'true',
  );
  envMap.set(
    'ALLOW_ERROR_MONITORING',
    typeof data.allowErrorMonitoring === 'boolean' ? String(data.allowErrorMonitoring) : envMap.get('ALLOW_ERROR_MONITORING') || 'false',
  );
  envMap.set(
    'PERSIST_TRAEFIK_CONFIG',
    typeof data.persistTraefikConfig === 'boolean' ? String(data.persistTraefikConfig) : envMap.get('PERSIST_TRAEFIK_CONFIG') || 'false',
  );

  fs.writeFileSync(envFilePath, envMapToString(envMap));

  dotenv.config({ path: envFilePath, override: true });

  return envMap;
};

/**
 * Copies the system files from the assets folder to the current working directory
 */
export const copySystemFiles = async (envMap: Map<EnvKeys, string>) => {
  // Remove old unused files
  if (await pathExists(path.join(DATA_DIR, 'scripts'))) {
    logger.info('Removing old scripts folder');
    await fs.promises.rmdir(path.join(DATA_DIR, 'scripts'), { recursive: true });
  }

  const assetsFolder = path.join(APP_DIR, 'assets');

  // Copy traefik folder from assets
  logger.info('Creating traefik folders');
  await fs.promises.mkdir(path.join(DATA_DIR, 'traefik', 'dynamic'), { recursive: true });
  await fs.promises.mkdir(path.join(DATA_DIR, 'traefik', 'shared'), { recursive: true });
  await fs.promises.mkdir(path.join(DATA_DIR, 'traefik', 'tls'), { recursive: true });

  if (envMap.get('PERSIST_TRAEFIK_CONFIG') === 'true') {
    logger.warn('Skipping the copy of traefik files because persistTraefikConfig is set to true');
  } else {
    logger.info('Copying traefik files');
    await fs.promises.copyFile(path.join(assetsFolder, 'traefik', 'traefik.yml'), path.join(DATA_DIR, 'traefik', 'traefik.yml'));
    await fs.promises.copyFile(
      path.join(assetsFolder, 'traefik', 'dynamic', 'dynamic.yml'),
      path.join(DATA_DIR, 'traefik', 'dynamic', 'dynamic.yml'),
    );
  }

  // Create base folders
  logger.info('Creating base folders');
  try {
    await fs.promises.mkdir(path.join(DATA_DIR, 'apps'), { recursive: true });
    await fs.promises.mkdir(APP_DATA_DIR, { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'state'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'repos'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'backups'), { recursive: true });
  } catch (error) {
    logger.error("Couldn't create base folders", error);
  }

  // Create media folders
  logger.info('Creating media folders');
  try {
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'torrents', 'watch'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'torrents', 'complete'), {
      recursive: true,
    });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'torrents', 'incomplete'), {
      recursive: true,
    });

    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'usenet', 'watch'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'usenet', 'complete'), {
      recursive: true,
    });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'usenet', 'incomplete'), {
      recursive: true,
    });

    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'downloads', 'watch'), {
      recursive: true,
    });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'downloads', 'complete'), {
      recursive: true,
    });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'downloads', 'incomplete'), {
      recursive: true,
    });

    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'data', 'books'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'data', 'comics'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'data', 'movies'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'data', 'music'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'data', 'tv'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'data', 'podcasts'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'data', 'images'), { recursive: true });
    await fs.promises.mkdir(path.join(DATA_DIR, 'media', 'data', 'roms'), { recursive: true });
  } catch (error) {
    logger.error("Couldn't create media folders", error);
  }
};

/**
 * Given a domain, generates the TLS certificates for it to be used with Traefik
 *
 * @param {string} data.domain The domain to generate the certificates for
 */
export const generateTlsCertificates = async (data: { domain?: string }) => {
  if (!data.domain) {
    return;
  }

  const tlsFolder = path.join(DATA_DIR, 'traefik', 'tls');

  // If the certificate already exists, don't generate it again
  if (
    (await pathExists(path.join(tlsFolder, `${data.domain}.txt`))) &&
    (await pathExists(path.join(tlsFolder, 'cert.pem'))) &&
    (await pathExists(path.join(tlsFolder, 'key.pem')))
  ) {
    logger.info(`TLS certificate for ${data.domain} already exists`);
    return;
  }

  // Empty out the folder
  const files = await fs.promises.readdir(tlsFolder);
  await Promise.all(
    files.map(async (file) => {
      logger.info(`Removing file ${file}`);
      await fs.promises.unlink(path.join(tlsFolder, file));
    }),
  );

  const subject = `/O=runtipi.io/OU=IT/CN=*.${data.domain}/emailAddress=webmaster@${data.domain}`;
  const subjectAltName = `DNS:*.${data.domain},DNS:${data.domain}`;

  try {
    logger.info(`Generating TLS certificate for ${data.domain}`);
    const { stderr } = await execAsync(
      `openssl req -x509 -newkey rsa:4096 -keyout ${DATA_DIR}/traefik/tls/key.pem -out ${DATA_DIR}/traefik/tls/cert.pem -days 365 -subj "${subject}" -addext "subjectAltName = ${subjectAltName}" -nodes`,
    );
    if (!(await pathExists(path.join(tlsFolder, 'cert.pem'))) || !(await pathExists(path.join(tlsFolder, 'key.pem')))) {
      logger.error(`Failed to generate TLS certificate for ${data.domain}`);
      logger.error(stderr);
    } else {
      logger.info(`Writing txt file for ${data.domain}`);
    }
    await fs.promises.writeFile(path.join(tlsFolder, `${data.domain}.txt`), '');
  } catch (error) {
    logger.error(error);
  }
};

export const getMainEnvMap = async (): Promise<Map<EnvKeys, string>> => {
  const envFilePath = path.join(DATA_DIR, '.env');

  if (!(await pathExists(envFilePath))) {
    throw new Error('Env file not found');
  }

  const envFile = await fs.promises.readFile(envFilePath, 'utf-8');

  return envStringToMap(envFile);
};
