// This file is auto-generated by @hey-api/openapi-ts

export type AcknowledgeWelcomeBody = {
  allowErrorMonitoring: boolean;
};

export type AppContextDto = {
  version: {
    current: string;
    latest: string;
    body: string;
  };
  userSettings: {
    dnsIp: string;
    internalIp: string;
    postgresPort: number;
    appsRepoUrl: string;
    domain: string;
    appDataPath: string;
    localDomain: string;
    demoMode: boolean;
    guestDashboard: boolean;
    allowAutoThemes: boolean;
    allowErrorMonitoring: boolean;
    persistTraefikConfig: boolean;
    port: number;
    sslPort: number;
    listenIp: string;
    timeZone: string;
  };
  user: {
    id: number;
    username: string;
    totpEnabled: boolean;
    locale: string;
    operator: boolean;
    hasSeenWelcome: boolean;
  };
  apps: Array<{
    id: string;
    name: string;
    short_desc: string;
    categories?: Array<
      | 'network'
      | 'media'
      | 'development'
      | 'automation'
      | 'social'
      | 'utilities'
      | 'photography'
      | 'security'
      | 'featured'
      | 'books'
      | 'data'
      | 'music'
      | 'finance'
      | 'gaming'
      | 'ai'
    >;
    deprecated?: boolean;
    created_at?: number;
    supported_architectures?: Array<'arm64' | 'amd64'>;
    available: boolean;
  }>;
  updatesAvailable: number;
};

export type AppDetailsDto = {
  info: {
    id: string;
    available: boolean;
    deprecated?: boolean;
    port: number;
    name: string;
    description?: string;
    version?: string;
    tipi_version: number;
    short_desc: string;
    author: string;
    source: string;
    website?: string;
    force_expose?: boolean;
    generate_vapid_keys?: boolean;
    categories?: Array<
      | 'network'
      | 'media'
      | 'development'
      | 'automation'
      | 'social'
      | 'utilities'
      | 'photography'
      | 'security'
      | 'featured'
      | 'books'
      | 'data'
      | 'music'
      | 'finance'
      | 'gaming'
      | 'ai'
    >;
    url_suffix?: string;
    form_fields?: Array<{
      type: 'text' | 'password' | 'email' | 'number' | 'fqdn' | 'ip' | 'fqdnip' | 'url' | 'random' | 'boolean';
      label: string;
      placeholder?: string;
      max?: number;
      min?: number;
      hint?: string;
      options?: Array<{
        label: string;
        value: string;
      }>;
      required?: boolean;
      default?: boolean | string | number;
      regex?: string;
      pattern_error?: string;
      env_variable: string;
      encoding?: 'hex' | 'base64';
    }>;
    https?: boolean;
    exposable?: boolean;
    no_gui?: boolean;
    supported_architectures?: Array<'arm64' | 'amd64'>;
    uid?: number;
    gid?: number;
    dynamic_config?: boolean;
    min_tipi_version?: string;
    created_at?: number;
    updated_at?: number;
  };
  app: {
    id: string;
    status:
      | 'running'
      | 'stopped'
      | 'starting'
      | 'stopping'
      | 'updating'
      | 'missing'
      | 'installing'
      | 'uninstalling'
      | 'resetting'
      | 'restarting'
      | 'backing_up'
      | 'restoring';
    lastOpened: string | null;
    numOpened?: number;
    createdAt?: string;
    updatedAt?: string;
    version: number;
    exposed: boolean;
    openPort: boolean;
    exposedLocal: boolean;
    domain: string | null;
    isVisibleOnGuestDashboard: boolean;
    config?: {
      [key: string]: unknown;
    };
  };
  updateInfo: {
    latestVersion: number;
    minTipiVersion?: string;
    latestDockerVersion?: string;
  };
};

export type status =
  | 'running'
  | 'stopped'
  | 'starting'
  | 'stopping'
  | 'updating'
  | 'missing'
  | 'installing'
  | 'uninstalling'
  | 'resetting'
  | 'restarting'
  | 'backing_up'
  | 'restoring';

export type AppFormBody = {
  exposed?: boolean;
  exposedLocal?: boolean;
  openPort?: boolean;
  domain?: string;
  isVisibleOnGuestDashboard?: boolean;
};

export type ChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
};

export type ChangeUsernameBody = {
  newUsername: string;
  password: string;
};

export type CheckResetPasswordRequestDto = {
  isRequestPending: boolean;
};

export type DeleteAppBackupBodyDto = {
  filename: string;
};

export type DisableTotpBody = {
  password: string;
};

export type EditLinkBodyDto = {
  title: string;
  url: string;
  description?: string;
  iconUrl?: string;
};

export type GetAppBackupsDto = {
  data: Array<{
    id: string;
    size: number;
    date: number;
  }>;
  total: number;
  currentPage: number;
  lastPage: number;
};

export type GetTotpUriBody = {
  password: string;
};

export type GetTotpUriDto = {
  key: string;
  uri: string;
};

export type GuestAppsDto = {
  installed: Array<{
    app: {
      id: string;
      status:
        | 'running'
        | 'stopped'
        | 'starting'
        | 'stopping'
        | 'updating'
        | 'missing'
        | 'installing'
        | 'uninstalling'
        | 'resetting'
        | 'restarting'
        | 'backing_up'
        | 'restoring';
      lastOpened: string | null;
      numOpened?: number;
      createdAt?: string;
      updatedAt?: string;
      version: number;
      exposed: boolean;
      openPort: boolean;
      exposedLocal: boolean;
      domain: string | null;
      isVisibleOnGuestDashboard: boolean;
      config?: {
        [key: string]: unknown;
      };
    };
    info: {
      id: string;
      available: boolean;
      deprecated?: boolean;
      port: number;
      name: string;
      description?: string;
      version?: string;
      tipi_version: number;
      short_desc: string;
      author: string;
      source: string;
      website?: string;
      force_expose?: boolean;
      generate_vapid_keys?: boolean;
      categories?: Array<
        | 'network'
        | 'media'
        | 'development'
        | 'automation'
        | 'social'
        | 'utilities'
        | 'photography'
        | 'security'
        | 'featured'
        | 'books'
        | 'data'
        | 'music'
        | 'finance'
        | 'gaming'
        | 'ai'
      >;
      url_suffix?: string;
      form_fields?: Array<{
        type: 'text' | 'password' | 'email' | 'number' | 'fqdn' | 'ip' | 'fqdnip' | 'url' | 'random' | 'boolean';
        label: string;
        placeholder?: string;
        max?: number;
        min?: number;
        hint?: string;
        options?: Array<{
          label: string;
          value: string;
        }>;
        required?: boolean;
        default?: boolean | string | number;
        regex?: string;
        pattern_error?: string;
        env_variable: string;
        encoding?: 'hex' | 'base64';
      }>;
      https?: boolean;
      exposable?: boolean;
      no_gui?: boolean;
      supported_architectures?: Array<'arm64' | 'amd64'>;
      uid?: number;
      gid?: number;
      dynamic_config?: boolean;
      min_tipi_version?: string;
      created_at?: number;
      updated_at?: number;
    };
    updateInfo: {
      latestVersion: number;
      minTipiVersion?: string;
      latestDockerVersion?: string;
    };
  }>;
};

export type LinkBodyDto = {
  title: string;
  url: string;
  description?: string;
  iconUrl?: string;
};

export type LinksDto = {
  links: Array<{
    id: number;
    title: string;
    description: string | null;
    url: string;
    iconUrl: string | null;
    userId: number;
  }>;
};

export type LoadDto = {
  diskUsed?: number | null;
  diskSize?: number | null;
  percentUsed?: number | null;
  cpuLoad?: number | null;
  memoryTotal?: number | null;
  percentUsedMemory?: number | null;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type LoginDto = {
  success: boolean;
  totpSessionId?: string;
};

export type MyAppsDto = {
  installed: Array<{
    app: {
      id: string;
      status:
        | 'running'
        | 'stopped'
        | 'starting'
        | 'stopping'
        | 'updating'
        | 'missing'
        | 'installing'
        | 'uninstalling'
        | 'resetting'
        | 'restarting'
        | 'backing_up'
        | 'restoring';
      lastOpened: string | null;
      numOpened?: number;
      createdAt?: string;
      updatedAt?: string;
      version: number;
      exposed: boolean;
      openPort: boolean;
      exposedLocal: boolean;
      domain: string | null;
      isVisibleOnGuestDashboard: boolean;
      config?: {
        [key: string]: unknown;
      };
    };
    info: {
      id: string;
      name: string;
      short_desc: string;
      categories?: Array<
        | 'network'
        | 'media'
        | 'development'
        | 'automation'
        | 'social'
        | 'utilities'
        | 'photography'
        | 'security'
        | 'featured'
        | 'books'
        | 'data'
        | 'music'
        | 'finance'
        | 'gaming'
        | 'ai'
      >;
      deprecated?: boolean;
      created_at?: number;
      supported_architectures?: Array<'arm64' | 'amd64'>;
      available: boolean;
    };
    updateInfo: {
      latestVersion: number;
      minTipiVersion?: string;
      latestDockerVersion?: string;
    };
  }>;
};

export type PartialUserSettingsDto = {
  dnsIp?: string;
  internalIp?: string;
  postgresPort?: number;
  appsRepoUrl?: string;
  domain?: string;
  appDataPath?: string;
  localDomain?: string;
  demoMode?: boolean;
  guestDashboard?: boolean;
  allowAutoThemes?: boolean;
  allowErrorMonitoring?: boolean;
  persistTraefikConfig?: boolean;
  port?: number;
  sslPort?: number;
  listenIp?: string;
  timeZone?: string;
};

export type PullDto = {
  success: boolean;
};

export type RegisterBody = {
  username: string;
  password: string;
};

export type RegisterDto = {
  success: boolean;
};

export type ResetPasswordBody = {
  newPassword: string;
};

export type ResetPasswordDto = {
  success: boolean;
  email: string;
};

export type RestoreAppBackupDto = {
  filename: string;
};

export type SearchAppsDto = {
  data: Array<{
    id: string;
    name: string;
    short_desc: string;
    categories?: Array<
      | 'network'
      | 'media'
      | 'development'
      | 'automation'
      | 'social'
      | 'utilities'
      | 'photography'
      | 'security'
      | 'featured'
      | 'books'
      | 'data'
      | 'music'
      | 'finance'
      | 'gaming'
      | 'ai'
    >;
    deprecated?: boolean;
    created_at?: number;
    supported_architectures?: Array<'arm64' | 'amd64'>;
    available: boolean;
  }>;
  nextCursor?: string;
  total: number;
};

export type SetupTotpBody = {
  code: string;
};

export type UninstallAppBody = {
  removeBackups: boolean;
};

export type UpdateAppBody = {
  performBackup: boolean;
};

export type UserContextDto = {
  /**
   * Indicates if the user is logged in
   */
  isLoggedIn: boolean;
  /**
   * Indicates if the app is already configured
   */
  isConfigured: boolean;
  /**
   * Indicates if the guest dashboard is enabled
   */
  isGuestDashboardEnabled: boolean;
  /**
   * Indicates if the app allows auto themes
   */
  allowAutoThemes: boolean;
};

export type VerifyTotpBody = {
  totpCode: string;
  totpSessionId: string;
};

export type UserContextResponse = UserContextDto;

export type UserContextError = unknown;

export type AppContextResponse = AppContextDto;

export type AppContextError = unknown;

export type UpdateUserSettingsData = {
  body: PartialUserSettingsDto;
};

export type UpdateUserSettingsResponse = unknown;

export type UpdateUserSettingsError = unknown;

export type AcknowledgeWelcomeData = {
  body: AcknowledgeWelcomeBody;
};

export type AcknowledgeWelcomeResponse = unknown;

export type AcknowledgeWelcomeError = unknown;

export type GetErrorResponse = unknown;

export type GetErrorError = unknown;

export type SystemLoadResponse = LoadDto;

export type SystemLoadError = unknown;

export type DownloadLocalCertificateResponse = unknown;

export type DownloadLocalCertificateError = unknown;

export type GetTranslationData = {
  path: {
    lng: string;
    ns: string;
  };
};

export type GetTranslationResponse = {
  [key: string]: unknown;
};

export type GetTranslationError = unknown;

export type LoginData = {
  body: LoginBody;
};

export type LoginResponse = LoginDto;

export type LoginError = unknown;

export type VerifyTotpData = {
  body: VerifyTotpBody;
};

export type VerifyTotpResponse = LoginDto;

export type VerifyTotpError = unknown;

export type RegisterData = {
  body: RegisterBody;
};

export type RegisterResponse = RegisterDto;

export type RegisterError = unknown;

export type LogoutResponse = unknown;

export type LogoutError = unknown;

export type ChangeUsernameData = {
  body: ChangeUsernameBody;
};

export type ChangeUsernameResponse = unknown;

export type ChangeUsernameError = unknown;

export type ChangePasswordData = {
  body: ChangePasswordBody;
};

export type ChangePasswordResponse = unknown;

export type ChangePasswordError = unknown;

export type GetTotpUriData = {
  body: GetTotpUriBody;
};

export type GetTotpUriResponse = GetTotpUriDto;

export type GetTotpUriError = unknown;

export type SetupTotpData = {
  body: SetupTotpBody;
};

export type SetupTotpResponse = unknown;

export type SetupTotpError = unknown;

export type DisableTotpData = {
  body: DisableTotpBody;
};

export type DisableTotpResponse = unknown;

export type DisableTotpError = unknown;

export type ResetPasswordData = {
  body: ResetPasswordBody;
};

export type ResetPasswordResponse = ResetPasswordDto;

export type ResetPasswordError = unknown;

export type CancelResetPasswordResponse = unknown;

export type CancelResetPasswordError = unknown;

export type CheckResetPasswordRequestResponse = CheckResetPasswordRequestDto;

export type CheckResetPasswordRequestError = unknown;

export type GetInstalledAppsResponse = MyAppsDto;

export type GetInstalledAppsError = unknown;

export type GetGuestAppsResponse = GuestAppsDto;

export type GetGuestAppsError = unknown;

export type SearchAppsData = {
  query?: {
    category?:
      | 'network'
      | 'media'
      | 'development'
      | 'automation'
      | 'social'
      | 'utilities'
      | 'photography'
      | 'security'
      | 'featured'
      | 'books'
      | 'data'
      | 'music'
      | 'finance'
      | 'gaming'
      | 'ai';
    cursor?: string;
    pageSize?: number;
    search?: string;
  };
};

export type SearchAppsResponse = SearchAppsDto;

export type SearchAppsError = unknown;

export type GetAppDetailsData = {
  path: {
    id: string;
  };
};

export type GetAppDetailsResponse = AppDetailsDto;

export type GetAppDetailsError = unknown;

export type GetImageData = {
  path: {
    id: string;
  };
};

export type GetImageResponse = unknown;

export type GetImageError = unknown;

export type PullResponse = PullDto;

export type PullError = unknown;

export type InstallAppData = {
  body: AppFormBody;
  path: {
    id: string;
  };
};

export type InstallAppResponse = unknown;

export type InstallAppError = unknown;

export type StartAppData = {
  path: {
    id: string;
  };
};

export type StartAppResponse = unknown;

export type StartAppError = unknown;

export type StopAppData = {
  path: {
    id: string;
  };
};

export type StopAppResponse = unknown;

export type StopAppError = unknown;

export type RestartAppData = {
  path: {
    id: string;
  };
};

export type RestartAppResponse = unknown;

export type RestartAppError = unknown;

export type UninstallAppData = {
  body: UninstallAppBody;
  path: {
    id: string;
  };
};

export type UninstallAppResponse = unknown;

export type UninstallAppError = unknown;

export type ResetAppData = {
  path: {
    id: string;
  };
};

export type ResetAppResponse = unknown;

export type ResetAppError = unknown;

export type UpdateAppData = {
  body: UpdateAppBody;
  path: {
    id: string;
  };
};

export type UpdateAppResponse = unknown;

export type UpdateAppError = unknown;

export type UpdateAllAppsResponse = unknown;

export type UpdateAllAppsError = unknown;

export type UpdateAppConfigData = {
  body: AppFormBody;
  path: {
    id: string;
  };
};

export type UpdateAppConfigResponse = unknown;

export type UpdateAppConfigError = unknown;

export type BackupAppData = {
  path: {
    appid: string;
  };
};

export type BackupAppResponse = unknown;

export type BackupAppError = unknown;

export type RestoreAppBackupData = {
  body: RestoreAppBackupDto;
  path: {
    appid: string;
  };
};

export type RestoreAppBackupResponse = unknown;

export type RestoreAppBackupError = unknown;

export type GetAppBackupsData = {
  path: {
    id: string;
  };
  query?: {
    page?: number;
    pageSize?: number;
  };
};

export type GetAppBackupsResponse = GetAppBackupsDto;

export type GetAppBackupsError = unknown;

export type DeleteAppBackupData = {
  body: DeleteAppBackupBodyDto;
  path: {
    appid: string;
  };
};

export type DeleteAppBackupResponse = unknown;

export type DeleteAppBackupError = unknown;

export type GetLinksResponse = LinksDto;

export type GetLinksError = unknown;

export type CreateLinkData = {
  body: LinkBodyDto;
};

export type CreateLinkResponse = unknown;

export type CreateLinkError = unknown;

export type EditLinkData = {
  body: EditLinkBodyDto;
  path: {
    id: number;
  };
};

export type EditLinkResponse = unknown;

export type EditLinkError = unknown;

export type DeleteLinkData = {
  path: {
    id: number;
  };
};

export type DeleteLinkResponse = unknown;

export type DeleteLinkError = unknown;

export type CheckResponse = {
  status?: string;
  info?: {
    [key: string]: {
      status: string;
      [key: string]: unknown | string;
    };
  } | null;
  error?: {
    [key: string]: {
      status: string;
      [key: string]: unknown | string;
    };
  } | null;
  details?: {
    [key: string]: {
      status: string;
      [key: string]: unknown | string;
    };
  };
};

export type CheckError = {
  status?: string;
  info?: {
    [key: string]: {
      status: string;
      [key: string]: unknown | string;
    };
  } | null;
  error?: {
    [key: string]: {
      status: string;
      [key: string]: unknown | string;
    };
  } | null;
  details?: {
    [key: string]: {
      status: string;
      [key: string]: unknown | string;
    };
  };
};
