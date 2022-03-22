import { ViteSSGContext } from 'vite-ssg'
import { EventBus } from '@/lib/event'

export function install({ app, isClient }: ViteSSGContext) {
  if (isClient) {
    const eventBus = new EventBus()
    app.provide('eventBus', eventBus)
  }
}
