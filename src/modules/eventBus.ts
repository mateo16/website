import { ViteSSGContext } from 'vite-ssg'
import { EventBus } from '@/lib/event'

export const install = ({ app }: ViteSSGContext) => {
  const eventBus = new EventBus()
  app.config.globalProperties.$eventBus = eventBus
  app.provide('eventBus', eventBus)
}
