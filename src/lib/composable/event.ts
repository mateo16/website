import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target: HTMLElement, eventName: string, callback: (event: Event) => void) {
  // if you want, you can also make this support selector strings as target
  onMounted(() => { target.addEventListener(eventName, callback) })
  onUnmounted(() => { target.removeEventListener(eventName, callback) })
}
