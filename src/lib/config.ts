export function isAnalyticsEnabled(): boolean {
  return import.meta.env.APSIS_ANALYTICS_ENABLED === 'true'
}

export function getAppConfig() {
  return {
    appUrl: import.meta.env.APSIS_APP_URL,
    homeRoute: import.meta.env.APSIS_HOME_ROUTE,
    apiBaseUrl: import.meta.env.APSIS_API_BASE_URL,
    contactEmailAddress: import.meta.env.APSIS_CONTACT_EMAIL_ADDRESS,
    linkedInUrl: import.meta.env.APSIS_LINKEDIN_URL,
    githubUrl: import.meta.env.APSIS_GITHUB_URL,
    twitterUrl: import.meta.env.APSIS_TWITTER_URL,
  }
}
