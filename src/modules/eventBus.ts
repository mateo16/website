import { ViteSSGContext } from 'vite-ssg'
import { EventBus } from '@/lib/event'

export function install({ app, isClient }: ViteSSGContext) {
  if (isClient) {
    // setup global event bus
    const eventBus = new EventBus()
    app.config.globalProperties.$eventBus = eventBus
    app.provide('eventBus', eventBus)
  }
}
