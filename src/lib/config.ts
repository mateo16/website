export function isPlatformWeb(): boolean {
  return import.meta.env.APSIS_APP_PLATFORM === 'web'
}

export function getAppConfig() {
  return {
    appUrl: import.meta.env.APSIS_APP_URL,
    homeRoute: import.meta.env.APSIS_HOME_ROUTE,
    platform: import.meta.env.APSIS_APP_PLATFORM,
    sessionApiBaseUrl: import.meta.env.APSIS_SESSION_API_BASE_URL
  }
}
