<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 var(--content-margin);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  align-items: center;

  transition: transform 200ms ease-out, opacity 200ms linear;
  min-height: var(--footer-height);
}

.footer-text {
  font-size: .6rem;
  font-weight: 300;
  color: var(--text-color);
  text-transform: uppercase;
}
</style>

<template>
  <footer
    class="footer footer-text non-selectable"
    :style="`${hidden ? 'opacity: 0; transform: translateY(100%) scale(.4)' : ''}`"
  >
    <span>{{ copy.company }}™ {{ thisYear }} – {{ copy.footer.copyright }}</span>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import copy from '@/assets/copy/en/app.yml'

const router = useRouter()
const thisYear = computed(() => `${new Date().getFullYear()}`)
const footerHeight = 30;
const hidden = ref(true)

// the scrollable element
let element: HTMLElement | null

// Vue router's afterEach guard nav's callback removal function
let removeAfterEachHook: () => void

const props = defineProps({
  scrollTarget: {
    type: String,
    default: null,
    required: false
  }
})

const onScroll = () => {
  if (element) {
    hidden.value = element.scrollHeight - element.clientHeight - footerHeight > element.scrollTop
  }
}

onMounted(() => {
  if (props.scrollTarget) {
    element = document.getElementById(props.scrollTarget)
    if (!element) {
      const msg = `Element with id "${props.scrollTarget}" not found`
      console.error(msg)
      throw new Error(msg)
    }

    // recalculate footer visibility when scroll position changes,
    // when the scrollable container is resized and after navigation
    element.addEventListener('scroll', onScroll)
    element.addEventListener('resize', onScroll)
    removeAfterEachHook = router.afterEach(() => { nextTick(onScroll) })

    // initialize
    onScroll()
  }
})

onBeforeUnmount(() => {
  if (element) {
    element.removeEventListener('scroll', onScroll)
    element.removeEventListener('resize', onScroll)
    removeAfterEachHook()
  }
})
</script>
