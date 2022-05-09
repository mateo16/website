import { ref } from 'vue'
import { useEventListener } from '@/lib/composable/event'

export default function useScrollPos(target: HTMLElement) {
  const scrollY = ref(0)

  useEventListener(target, 'scroll', () => { scrollY.value = target.scrollTop })

  return { scrollY }
}
