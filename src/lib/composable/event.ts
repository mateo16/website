import { onMounted, onUnmounted } from 'vue'
import { useEventBus, Events, ApplicationEventCallback } from '@/lib/event'
import { useEventListener } from '@vueuse/core'

export function useWindowEventListener(eventName: string, callback: (event: Event) => void) {
  return useEventListener(window, eventName, callback)
}

export function useApplicationEventListener(event: Events, callback: ApplicationEventCallback) {
  const eventBus = useEventBus()
  onMounted(() => { eventBus.on(event, callback) })
  onUnmounted(() => { eventBus.off(event, callback) })
}
