export function isAnalyticsEnabled(): boolean {
  return import.meta.env.VITE_ANALYTICS_ENABLED === 'true'
}

export function isDevelopment(): boolean {
  return import.meta.env.VITE_APP_MODE === 'development'
}

export function isProduction(): boolean {
  return import.meta.env.VITE_APP_MODE === 'production'
}

export function getAppConfig() {
  return {
    appUrl: import.meta.env.VITE_APP_URL,
    homeRoute: import.meta.env.VITE_HOME_ROUTE,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    contactEmailAddress: import.meta.env.VITE_CONTACT_EMAIL_ADDRESS,
    linkedInUrl: import.meta.env.VITE_LINKEDIN_URL,
    githubUrl: import.meta.env.VITE_GITHUB_URL,
    twitterUrl: import.meta.env.VITE_TWITTER_URL,
  }
}
