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

.social-logo {
  /* width: .9rem; */
  height: .9rem;
  transition: color 100ms linear;
}

@media (--hover) {
  .social-logo:hover {
    color: var(--accent-color);
    cursor: pointer;
  }
}
</style>

<template>
  <footer
    class="footer non-selectable"
    :style="`${hidden ? 'opacity: 0; transform: translateY(100%) scale(.4)' : ''}`"
  >
    <span class="footer-text">{{ copy.footer.notice }} {{ copy.company }}™ {{ thisYear }}</span>
    <span class="footer-text">—</span>
    <svg
      class="social-logo"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      @click="navigate(config.company.linkedin, true)"
    >
      <path fill="currentColor" d="M426.032 426.03H351.946V309.999C351.946 282.33 351.452 246.712 313.414 246.712C274.827 246.712 268.922 276.857 268.922 307.984V426.021H194.838V187.415H265.959V220.023C280.44 195.261 308.463 180.417 337.129 181.482C412.218 181.482 426.064 230.875 426.064 295.135L426.032 426.03ZM111.245 154.799C87.6594 154.799 68.2426 135.392 68.2426 111.805C68.2426 88.2173 87.6505 68.808 111.236 68.808C134.819 68.808 154.225 88.2128 154.229 111.796C154.229 135.378 134.826 154.797 111.245 154.799ZM148.287 426.03H74.1245V187.415H148.287V426.03ZM462.965 0.00317357H36.8946C16.8942 -0.222724 0.243771 16.0419 0 36.0439V463.916C0.234826 483.929 16.883 500.212 36.8946 499.997H462.965C483.026 500.25 499.732 483.97 500 463.916V36.0148C499.732 15.9703 483.003 -0.260746 462.965 0.00317357Z" />
    </svg>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { navigate } from '@/lib/utils'
import copy from '@/assets/copy/en/app.yml'
import config from '@/assets/config.yml'

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
