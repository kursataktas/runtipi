import { promises } from 'fs';
import axios from 'redaxios';
import { tipiCache } from '@/server/core/TipiCache';
import { DATA_DIR } from '@/config/constants';
import { fileExists } from '../../common/fs.helpers';
import { Logger } from '../../core/Logger';
import { TipiConfig } from '../../core/TipiConfig';
import path from 'path';
import { appStoresFileSchema } from 'packages/shared';
import { pathExists } from 'packages/shared/src/node';

export class SystemServiceClass {
  /**
   * Get the current and latest version of Tipi
   *
   * @returns {Promise<{ current: string; latest: string }>} The current and latest version
   */
  public getVersion = async () => {
    try {
      const { seePreReleaseVersions, version: currentVersion } = TipiConfig.getConfig();

      if (seePreReleaseVersions) {
        const { data } = await axios.get<{ tag_name: string; body: string }[]>('https://api.github.com/repos/runtipi/runtipi/releases');

        return { current: currentVersion, latest: data[0]?.tag_name ?? currentVersion, body: data[0]?.body };
      }

      let version = await tipiCache.get('latestVersion');
      let body = await tipiCache.get('latestVersionBody');

      if (!version) {
        const { data } = await axios.get<{ tag_name: string; body: string }>('https://api.github.com/repos/runtipi/runtipi/releases/latest');

        version = data.tag_name;
        body = data.body;

        await tipiCache.set('latestVersion', version || '', 60 * 60);
        await tipiCache.set('latestVersionBody', body || '', 60 * 60);
      }

      return { current: TipiConfig.getConfig().version, latest: version, body };
    } catch (e) {
      Logger.error(e);
      return { current: TipiConfig.getConfig().version, latest: TipiConfig.getConfig().version, body: '' };
    }
  };

  public static hasSeenWelcome = async () => {
    return fileExists(`${DATA_DIR}/state/seen-welcome`);
  };

  public static markSeenWelcome = async () => {
    // Create file state/seen-welcome
    await promises.writeFile(`${DATA_DIR}/state/seen-welcome`, '');
    return true;
  };

  public getAppStores = async () => {
    try {
      const appStoreFilePath = path.join(DATA_DIR, 'state', 'appstores.json');

      if (!(await pathExists(appStoreFilePath))) {
        throw new Error('App stores file does not exist! Is the worker runnning?');
      }

      const appStoreFile = await promises.readFile(appStoreFilePath, 'utf-8');

      const parsedSchema = await appStoresFileSchema.safeParseAsync(JSON.parse(appStoreFile));

      if (parsedSchema.error) {
        throw new Error('Failed to parse appstores file. Is the schema correct?');
      }

      return parsedSchema.data;
    } catch (e) {
      Logger.error(e);
      return { appstores: [] };
    }
  };
}
