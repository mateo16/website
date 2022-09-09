import { onMounted, onUnmounted } from 'vue'
import { useEventBus, Events, ApplicationEventCallback } from '@/lib/event'

export function useEventListener(target: HTMLElement, eventName: string, callback: (event: Event) => void) {
  // if you want, you can also make this support selector strings as target
  onMounted(() => { target.addEventListener(eventName, callback) })
  onUnmounted(() => { target.removeEventListener(eventName, callback) })
}

export function useWindowEventListener(eventName: string, callback: (event: Event) => void) {
  // if you want, you can also make this support selector strings as target
  onMounted(() => { window.addEventListener(eventName, callback) })
  onUnmounted(() => { window.removeEventListener(eventName, callback) })
}

export function useApplicationEventListener(event: Events, callback: ApplicationEventCallback) {
  const eventBus = useEventBus()
  onMounted(() => { eventBus.on(event, callback) })
  onUnmounted(() => { eventBus.off(event, callback) })
}
