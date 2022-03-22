import { ViteSSGContext } from 'vite-ssg'
import { initializeApp } from 'firebase/app'
import { initializeAnalytics } from 'firebase/analytics'
import { isAnalyticsEnabled } from '@/lib/config'
import { trackNavigation } from '@/lib/analytics'

export const install = ({ router, isClient }: ViteSSGContext) => {
  if (!isClient) {
    return
  }

  // initialize Firebase
  const app = initializeApp({
    apiKey: import.meta.env.APSIS_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.APSIS_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.APSIS_FIREBASE_PROJECT_ID as string,
    appId: import.meta.env.APSIS_FIREBASE_APP_ID as string,
    measurementId: import.meta.env.APSIS_FIREBASE_MEASUREMENT_ID as string
  });

  if (isAnalyticsEnabled()) {
    // initialize analytics
    initializeAnalytics(app, {
      // disable automatic events
      config: {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      }
    })

    router.afterEach(() => {
      // track navigation via Vue router's navguard
      trackNavigation()
    })
  } else {
    console.debug('Analytics are disabled')
  }
}
