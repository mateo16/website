import { setUserId, getAnalytics, logEvent } from "firebase/analytics"
import { isAnalyticsEnabled } from '@/lib/config'

const log = (eventName: string, params?: object) => {
  if (isAnalyticsEnabled()) {
    logEvent(getAnalytics(), eventName, params);
  }
}

// Navigation
export function trackNavigation() {
  log('navigation')
}

// Auth events
export function trackUser(userId: string) {
  if (isAnalyticsEnabled()) {
    setUserId(getAnalytics(), userId)
  }
}

export function trackSignIn() {
  log('sign-in');
}

export function trackSignOut() {
  log('sign-out');
}
