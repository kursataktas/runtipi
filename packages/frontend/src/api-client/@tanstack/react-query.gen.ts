// This file is auto-generated by @hey-api/openapi-ts

import type { Options } from '@hey-api/client-fetch';
import { queryOptions, type UseMutationOptions, infiniteQueryOptions, type InfiniteData } from '@tanstack/react-query';
import {
  client,
  userContext,
  appContext,
  updateUserSettings,
  acknowledgeWelcome,
  getError,
  systemLoad,
  downloadLocalCertificate,
  getTranslation,
  login,
  verifyTotp,
  register,
  logout,
  changeUsername,
  changePassword,
  getTotpUri,
  setupTotp,
  disableTotp,
  resetPassword,
  cancelResetPassword,
  checkResetPasswordRequest,
  getInstalledApps,
  getGuestApps,
  searchApps,
  getAppDetails,
  getImage,
  pull,
  installApp,
  startApp,
  stopApp,
  restartApp,
  uninstallApp,
  resetApp,
  updateApp,
  updateAllApps,
  updateAppConfig,
  backupApp,
  restoreAppBackup,
  getAppBackups,
  deleteAppBackup,
  getLinks,
  createLink,
  editLink,
  deleteLink,
  check,
} from '../services.gen';
import type {
  UpdateUserSettingsData,
  UpdateUserSettingsError,
  UpdateUserSettingsResponse,
  AcknowledgeWelcomeData,
  AcknowledgeWelcomeError,
  AcknowledgeWelcomeResponse,
  GetTranslationData,
  LoginData,
  LoginError,
  LoginResponse,
  VerifyTotpData,
  VerifyTotpError,
  VerifyTotpResponse,
  RegisterData,
  RegisterError,
  RegisterResponse,
  LogoutError,
  LogoutResponse,
  ChangeUsernameData,
  ChangeUsernameError,
  ChangeUsernameResponse,
  ChangePasswordData,
  ChangePasswordError,
  ChangePasswordResponse,
  GetTotpUriData,
  GetTotpUriError,
  GetTotpUriResponse,
  SetupTotpData,
  SetupTotpError,
  SetupTotpResponse,
  DisableTotpData,
  DisableTotpError,
  DisableTotpResponse,
  ResetPasswordData,
  ResetPasswordError,
  ResetPasswordResponse,
  CancelResetPasswordError,
  CancelResetPasswordResponse,
  SearchAppsData,
  SearchAppsError,
  SearchAppsResponse,
  GetAppDetailsData,
  GetImageData,
  PullError,
  PullResponse,
  InstallAppData,
  InstallAppError,
  InstallAppResponse,
  StartAppData,
  StartAppError,
  StartAppResponse,
  StopAppData,
  StopAppError,
  StopAppResponse,
  RestartAppData,
  RestartAppError,
  RestartAppResponse,
  UninstallAppData,
  UninstallAppError,
  UninstallAppResponse,
  ResetAppData,
  ResetAppError,
  ResetAppResponse,
  UpdateAppData,
  UpdateAppError,
  UpdateAppResponse,
  UpdateAllAppsError,
  UpdateAllAppsResponse,
  UpdateAppConfigData,
  UpdateAppConfigError,
  UpdateAppConfigResponse,
  BackupAppData,
  BackupAppError,
  BackupAppResponse,
  RestoreAppBackupData,
  RestoreAppBackupError,
  RestoreAppBackupResponse,
  GetAppBackupsData,
  GetAppBackupsError,
  GetAppBackupsResponse,
  DeleteAppBackupData,
  DeleteAppBackupError,
  DeleteAppBackupResponse,
  CreateLinkData,
  CreateLinkError,
  CreateLinkResponse,
  EditLinkData,
  EditLinkError,
  EditLinkResponse,
  DeleteLinkData,
  DeleteLinkError,
  DeleteLinkResponse,
} from '../types.gen';

type QueryKey<TOptions extends Options> = [
  Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
    _id: string;
    _infinite?: boolean;
  },
];

const createQueryKey = <TOptions extends Options>(id: string, options?: TOptions, infinite?: boolean): QueryKey<TOptions>[0] => {
  const params: QueryKey<TOptions>[0] = { _id: id, baseUrl: (options?.client ?? client).getConfig().baseUrl } as QueryKey<TOptions>[0];
  if (infinite) {
    params._infinite = infinite;
  }
  if (options?.body) {
    params.body = options.body;
  }
  if (options?.headers) {
    params.headers = options.headers;
  }
  if (options?.path) {
    params.path = options.path;
  }
  if (options?.query) {
    params.query = options.query;
  }
  return params;
};

export const userContextQueryKey = (options?: Options) => [createQueryKey('userContext', options)];

export const userContextOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await userContext({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: userContextQueryKey(options),
  });
};

export const appContextQueryKey = (options?: Options) => [createQueryKey('appContext', options)];

export const appContextOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await appContext({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: appContextQueryKey(options),
  });
};

export const updateUserSettingsMutation = (options?: Partial<Options<UpdateUserSettingsData>>) => {
  const mutationOptions: UseMutationOptions<UpdateUserSettingsResponse, UpdateUserSettingsError, Options<UpdateUserSettingsData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await updateUserSettings({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const acknowledgeWelcomeMutation = (options?: Partial<Options<AcknowledgeWelcomeData>>) => {
  const mutationOptions: UseMutationOptions<AcknowledgeWelcomeResponse, AcknowledgeWelcomeError, Options<AcknowledgeWelcomeData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await acknowledgeWelcome({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getErrorQueryKey = (options?: Options) => [createQueryKey('getError', options)];

export const getErrorOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getError({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getErrorQueryKey(options),
  });
};

export const systemLoadQueryKey = (options?: Options) => [createQueryKey('systemLoad', options)];

export const systemLoadOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await systemLoad({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: systemLoadQueryKey(options),
  });
};

export const downloadLocalCertificateQueryKey = (options?: Options) => [createQueryKey('downloadLocalCertificate', options)];

export const downloadLocalCertificateOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await downloadLocalCertificate({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: downloadLocalCertificateQueryKey(options),
  });
};

export const getTranslationQueryKey = (options: Options<GetTranslationData>) => [createQueryKey('getTranslation', options)];

export const getTranslationOptions = (options: Options<GetTranslationData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getTranslation({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getTranslationQueryKey(options),
  });
};

export const loginQueryKey = (options: Options<LoginData>) => [createQueryKey('login', options)];

export const loginOptions = (options: Options<LoginData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await login({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: loginQueryKey(options),
  });
};

export const loginMutation = (options?: Partial<Options<LoginData>>) => {
  const mutationOptions: UseMutationOptions<LoginResponse, LoginError, Options<LoginData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await login({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const verifyTotpQueryKey = (options: Options<VerifyTotpData>) => [createQueryKey('verifyTotp', options)];

export const verifyTotpOptions = (options: Options<VerifyTotpData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await verifyTotp({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: verifyTotpQueryKey(options),
  });
};

export const verifyTotpMutation = (options?: Partial<Options<VerifyTotpData>>) => {
  const mutationOptions: UseMutationOptions<VerifyTotpResponse, VerifyTotpError, Options<VerifyTotpData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await verifyTotp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const registerQueryKey = (options: Options<RegisterData>) => [createQueryKey('register', options)];

export const registerOptions = (options: Options<RegisterData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await register({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: registerQueryKey(options),
  });
};

export const registerMutation = (options?: Partial<Options<RegisterData>>) => {
  const mutationOptions: UseMutationOptions<RegisterResponse, RegisterError, Options<RegisterData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await register({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const logoutQueryKey = (options?: Options) => [createQueryKey('logout', options)];

export const logoutOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await logout({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: logoutQueryKey(options),
  });
};

export const logoutMutation = (options?: Partial<Options>) => {
  const mutationOptions: UseMutationOptions<LogoutResponse, LogoutError, Options> = {
    mutationFn: async (localOptions) => {
      const { data } = await logout({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const changeUsernameMutation = (options?: Partial<Options<ChangeUsernameData>>) => {
  const mutationOptions: UseMutationOptions<ChangeUsernameResponse, ChangeUsernameError, Options<ChangeUsernameData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await changeUsername({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const changePasswordMutation = (options?: Partial<Options<ChangePasswordData>>) => {
  const mutationOptions: UseMutationOptions<ChangePasswordResponse, ChangePasswordError, Options<ChangePasswordData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await changePassword({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getTotpUriMutation = (options?: Partial<Options<GetTotpUriData>>) => {
  const mutationOptions: UseMutationOptions<GetTotpUriResponse, GetTotpUriError, Options<GetTotpUriData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await getTotpUri({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const setupTotpMutation = (options?: Partial<Options<SetupTotpData>>) => {
  const mutationOptions: UseMutationOptions<SetupTotpResponse, SetupTotpError, Options<SetupTotpData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await setupTotp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const disableTotpMutation = (options?: Partial<Options<DisableTotpData>>) => {
  const mutationOptions: UseMutationOptions<DisableTotpResponse, DisableTotpError, Options<DisableTotpData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await disableTotp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const resetPasswordQueryKey = (options: Options<ResetPasswordData>) => [createQueryKey('resetPassword', options)];

export const resetPasswordOptions = (options: Options<ResetPasswordData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await resetPassword({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: resetPasswordQueryKey(options),
  });
};

export const resetPasswordMutation = (options?: Partial<Options<ResetPasswordData>>) => {
  const mutationOptions: UseMutationOptions<ResetPasswordResponse, ResetPasswordError, Options<ResetPasswordData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await resetPassword({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const cancelResetPasswordMutation = (options?: Partial<Options>) => {
  const mutationOptions: UseMutationOptions<CancelResetPasswordResponse, CancelResetPasswordError, Options> = {
    mutationFn: async (localOptions) => {
      const { data } = await cancelResetPassword({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const checkResetPasswordRequestQueryKey = (options?: Options) => [createQueryKey('checkResetPasswordRequest', options)];

export const checkResetPasswordRequestOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await checkResetPasswordRequest({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: checkResetPasswordRequestQueryKey(options),
  });
};

export const getInstalledAppsQueryKey = (options?: Options) => [createQueryKey('getInstalledApps', options)];

export const getInstalledAppsOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getInstalledApps({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getInstalledAppsQueryKey(options),
  });
};

export const getGuestAppsQueryKey = (options?: Options) => [createQueryKey('getGuestApps', options)];

export const getGuestAppsOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getGuestApps({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getGuestAppsQueryKey(options),
  });
};

export const searchAppsQueryKey = (options?: Options<SearchAppsData>) => [createQueryKey('searchApps', options)];

export const searchAppsOptions = (options?: Options<SearchAppsData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await searchApps({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: searchAppsQueryKey(options),
  });
};

const createInfiniteParams = <K extends Pick<QueryKey<Options>[0], 'body' | 'headers' | 'path' | 'query'>>(queryKey: QueryKey<Options>, page: K) => {
  const params = queryKey[0];
  if (page.body) {
    params.body = {
      ...(queryKey[0].body as any),
      ...(page.body as any),
    };
  }
  if (page.headers) {
    params.headers = {
      ...queryKey[0].headers,
      ...page.headers,
    };
  }
  if (page.path) {
    params.path = {
      ...queryKey[0].path,
      ...page.path,
    };
  }
  if (page.query) {
    params.query = {
      ...queryKey[0].query,
      ...page.query,
    };
  }
  return params as unknown as typeof page;
};

export const searchAppsInfiniteQueryKey = (options?: Options<SearchAppsData>): QueryKey<Options<SearchAppsData>> => [
  createQueryKey('searchApps', options, true),
];

export const searchAppsInfiniteOptions = (options?: Options<SearchAppsData>) => {
  return infiniteQueryOptions<
    SearchAppsResponse,
    SearchAppsError,
    InfiniteData<SearchAppsResponse>,
    QueryKey<Options<SearchAppsData>>,
    string | Pick<QueryKey<Options<SearchAppsData>>[0], 'body' | 'headers' | 'path' | 'query'>
  >(
    // @ts-ignore
    {
      queryFn: async ({ pageParam, queryKey, signal }) => {
        // @ts-ignore
        const page: Pick<QueryKey<Options<SearchAppsData>>[0], 'body' | 'headers' | 'path' | 'query'> =
          typeof pageParam === 'object'
            ? pageParam
            : {
                query: {
                  cursor: pageParam,
                },
              };
        const params = createInfiniteParams(queryKey, page);
        const { data } = await searchApps({
          ...options,
          ...params,
          signal,
          throwOnError: true,
        });
        return data;
      },
      queryKey: searchAppsInfiniteQueryKey(options),
    },
  );
};

export const getAppDetailsQueryKey = (options: Options<GetAppDetailsData>) => [createQueryKey('getAppDetails', options)];

export const getAppDetailsOptions = (options: Options<GetAppDetailsData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getAppDetails({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getAppDetailsQueryKey(options),
  });
};

export const getImageQueryKey = (options: Options<GetImageData>) => [createQueryKey('getImage', options)];

export const getImageOptions = (options: Options<GetImageData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getImage({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getImageQueryKey(options),
  });
};

export const pullQueryKey = (options?: Options) => [createQueryKey('pull', options)];

export const pullOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await pull({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: pullQueryKey(options),
  });
};

export const pullMutation = (options?: Partial<Options>) => {
  const mutationOptions: UseMutationOptions<PullResponse, PullError, Options> = {
    mutationFn: async (localOptions) => {
      const { data } = await pull({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const installAppQueryKey = (options: Options<InstallAppData>) => [createQueryKey('installApp', options)];

export const installAppOptions = (options: Options<InstallAppData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await installApp({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: installAppQueryKey(options),
  });
};

export const installAppMutation = (options?: Partial<Options<InstallAppData>>) => {
  const mutationOptions: UseMutationOptions<InstallAppResponse, InstallAppError, Options<InstallAppData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await installApp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const startAppQueryKey = (options: Options<StartAppData>) => [createQueryKey('startApp', options)];

export const startAppOptions = (options: Options<StartAppData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await startApp({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: startAppQueryKey(options),
  });
};

export const startAppMutation = (options?: Partial<Options<StartAppData>>) => {
  const mutationOptions: UseMutationOptions<StartAppResponse, StartAppError, Options<StartAppData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await startApp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const stopAppQueryKey = (options: Options<StopAppData>) => [createQueryKey('stopApp', options)];

export const stopAppOptions = (options: Options<StopAppData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await stopApp({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: stopAppQueryKey(options),
  });
};

export const stopAppMutation = (options?: Partial<Options<StopAppData>>) => {
  const mutationOptions: UseMutationOptions<StopAppResponse, StopAppError, Options<StopAppData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await stopApp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const restartAppQueryKey = (options: Options<RestartAppData>) => [createQueryKey('restartApp', options)];

export const restartAppOptions = (options: Options<RestartAppData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await restartApp({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: restartAppQueryKey(options),
  });
};

export const restartAppMutation = (options?: Partial<Options<RestartAppData>>) => {
  const mutationOptions: UseMutationOptions<RestartAppResponse, RestartAppError, Options<RestartAppData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await restartApp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const uninstallAppMutation = (options?: Partial<Options<UninstallAppData>>) => {
  const mutationOptions: UseMutationOptions<UninstallAppResponse, UninstallAppError, Options<UninstallAppData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await uninstallApp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const resetAppQueryKey = (options: Options<ResetAppData>) => [createQueryKey('resetApp', options)];

export const resetAppOptions = (options: Options<ResetAppData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await resetApp({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: resetAppQueryKey(options),
  });
};

export const resetAppMutation = (options?: Partial<Options<ResetAppData>>) => {
  const mutationOptions: UseMutationOptions<ResetAppResponse, ResetAppError, Options<ResetAppData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await resetApp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const updateAppMutation = (options?: Partial<Options<UpdateAppData>>) => {
  const mutationOptions: UseMutationOptions<UpdateAppResponse, UpdateAppError, Options<UpdateAppData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await updateApp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const updateAllAppsMutation = (options?: Partial<Options>) => {
  const mutationOptions: UseMutationOptions<UpdateAllAppsResponse, UpdateAllAppsError, Options> = {
    mutationFn: async (localOptions) => {
      const { data } = await updateAllApps({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const updateAppConfigMutation = (options?: Partial<Options<UpdateAppConfigData>>) => {
  const mutationOptions: UseMutationOptions<UpdateAppConfigResponse, UpdateAppConfigError, Options<UpdateAppConfigData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await updateAppConfig({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const backupAppQueryKey = (options: Options<BackupAppData>) => [createQueryKey('backupApp', options)];

export const backupAppOptions = (options: Options<BackupAppData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await backupApp({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: backupAppQueryKey(options),
  });
};

export const backupAppMutation = (options?: Partial<Options<BackupAppData>>) => {
  const mutationOptions: UseMutationOptions<BackupAppResponse, BackupAppError, Options<BackupAppData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await backupApp({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const restoreAppBackupQueryKey = (options: Options<RestoreAppBackupData>) => [createQueryKey('restoreAppBackup', options)];

export const restoreAppBackupOptions = (options: Options<RestoreAppBackupData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await restoreAppBackup({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: restoreAppBackupQueryKey(options),
  });
};

export const restoreAppBackupMutation = (options?: Partial<Options<RestoreAppBackupData>>) => {
  const mutationOptions: UseMutationOptions<RestoreAppBackupResponse, RestoreAppBackupError, Options<RestoreAppBackupData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await restoreAppBackup({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getAppBackupsQueryKey = (options: Options<GetAppBackupsData>) => [createQueryKey('getAppBackups', options)];

export const getAppBackupsOptions = (options: Options<GetAppBackupsData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getAppBackups({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getAppBackupsQueryKey(options),
  });
};

export const getAppBackupsInfiniteQueryKey = (options: Options<GetAppBackupsData>): QueryKey<Options<GetAppBackupsData>> => [
  createQueryKey('getAppBackups', options, true),
];

export const getAppBackupsInfiniteOptions = (options: Options<GetAppBackupsData>) => {
  return infiniteQueryOptions<
    GetAppBackupsResponse,
    GetAppBackupsError,
    InfiniteData<GetAppBackupsResponse>,
    QueryKey<Options<GetAppBackupsData>>,
    number | Pick<QueryKey<Options<GetAppBackupsData>>[0], 'body' | 'headers' | 'path' | 'query'>
  >(
    // @ts-ignore
    {
      queryFn: async ({ pageParam, queryKey, signal }) => {
        // @ts-ignore
        const page: Pick<QueryKey<Options<GetAppBackupsData>>[0], 'body' | 'headers' | 'path' | 'query'> =
          typeof pageParam === 'object'
            ? pageParam
            : {
                query: {
                  page: pageParam,
                },
              };
        const params = createInfiniteParams(queryKey, page);
        const { data } = await getAppBackups({
          ...options,
          ...params,
          signal,
          throwOnError: true,
        });
        return data;
      },
      queryKey: getAppBackupsInfiniteQueryKey(options),
    },
  );
};

export const deleteAppBackupMutation = (options?: Partial<Options<DeleteAppBackupData>>) => {
  const mutationOptions: UseMutationOptions<DeleteAppBackupResponse, DeleteAppBackupError, Options<DeleteAppBackupData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await deleteAppBackup({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const getLinksQueryKey = (options?: Options) => [createQueryKey('getLinks', options)];

export const getLinksOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getLinks({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: getLinksQueryKey(options),
  });
};

export const createLinkQueryKey = (options: Options<CreateLinkData>) => [createQueryKey('createLink', options)];

export const createLinkOptions = (options: Options<CreateLinkData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await createLink({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: createLinkQueryKey(options),
  });
};

export const createLinkMutation = (options?: Partial<Options<CreateLinkData>>) => {
  const mutationOptions: UseMutationOptions<CreateLinkResponse, CreateLinkError, Options<CreateLinkData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await createLink({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const editLinkMutation = (options?: Partial<Options<EditLinkData>>) => {
  const mutationOptions: UseMutationOptions<EditLinkResponse, EditLinkError, Options<EditLinkData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await editLink({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const deleteLinkMutation = (options?: Partial<Options<DeleteLinkData>>) => {
  const mutationOptions: UseMutationOptions<DeleteLinkResponse, DeleteLinkError, Options<DeleteLinkData>> = {
    mutationFn: async (localOptions) => {
      const { data } = await deleteLink({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const checkQueryKey = (options?: Options) => [createQueryKey('check', options)];

export const checkOptions = (options?: Options) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await check({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: checkQueryKey(options),
  });
};
