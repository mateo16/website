export function isAnalyticsEnabled(): boolean {
  return import.meta.env.APSIS_ANALYTICS_ENABLED === 'true'
}

export function getAppConfig() {
  return {
    appUrl: import.meta.env.APSIS_APP_URL,
    homeRoute: import.meta.env.APSIS_HOME_ROUTE,
    apiBaseUrl: import.meta.env.APSIS_API_BASE_URL
  }
}
