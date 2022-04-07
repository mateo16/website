import { getAnalytics, logEvent } from "firebase/analytics"
import { isAnalyticsEnabled } from '@/lib/config'

const track = (eventName: string, params?: object) => {
  if (isAnalyticsEnabled()) {
    logEvent(getAnalytics(), eventName, params);
  }
}

// Navigation
export function trackNavigation() {
  track('navigation')
}

// Navigation
export function trackContactRequest() {
  track('contact-request')
}

// Auth events
// export function trackUser(userId: string) {
//   if (isAnalyticsEnabled()) {
//     setUserId(getAnalytics(), userId)
//   }
// }
