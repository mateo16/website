import { getAnalytics, logEvent } from "firebase/analytics"
import { isAnalyticsEnabled } from '@/lib/config'

const trackEvent = (eventName: string, params?: object) => {
  if (isAnalyticsEnabled()) {
    logEvent(getAnalytics(), eventName, params);
  }
}

// Navigation
export function trackNavigation() {
  trackEvent('navigation')
}

export function trackContactRequest() {
  trackEvent('contact-request')
}

export function trackError(message: string) {
  trackEvent('app-error', { value: message })
}

export function trackSocial(value: string) {
  trackEvent('social', { value })
}
