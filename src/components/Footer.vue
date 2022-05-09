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
    <svg
      class="social-logo"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      @click="navigate(config.company.github, true)"
    >
      <path fill="currentColor" d="M250 0C111.875 0 0 111.875 0 250C0 360.625 71.5625 454.062 170.938 487.188C183.438 489.375 188.125 481.875 188.125 475.312C188.125 469.375 187.812 449.688 187.812 428.75C125 440.312 108.75 413.438 103.75 399.375C100.938 392.188 88.75 370 78.125 364.062C69.375 359.375 56.875 347.812 77.8125 347.5C97.5 347.188 111.562 365.625 116.25 373.125C138.75 410.938 174.688 400.312 189.062 393.75C191.25 377.5 197.812 366.562 205 360.312C149.375 354.062 91.25 332.5 91.25 236.875C91.25 209.688 100.938 187.188 116.875 169.688C114.375 163.438 105.625 137.812 119.375 103.438C119.375 103.438 140.312 96.875 188.125 129.062C208.125 123.438 229.375 120.625 250.625 120.625C271.875 120.625 293.125 123.438 313.125 129.062C360.938 96.5625 381.875 103.438 381.875 103.438C395.625 137.812 386.875 163.438 384.375 169.688C400.312 187.188 410 209.375 410 236.875C410 332.812 351.562 354.062 295.938 360.312C305 368.125 312.812 383.125 312.812 406.562C312.812 440 312.5 466.875 312.5 475.312C312.5 481.875 317.188 489.688 329.688 487.188C428.438 454.062 500 360.312 500 250C500 111.875 388.125 0 250 0Z" />
    </svg>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { navigate } from '@/lib/utils'
import { getElement } from '@/lib/element'
import copy from '@/assets/copy/en/app.yml'
import useScroll from '@/lib/composable/scroll'
import config from '@/assets/config.yml'

const props = defineProps({
  scrollTarget: {
    type: String,
    required: true
  },
  threshold: {
    type: Number,
    required: false,
    default: 30
  }
})

const router = useRouter()
const thisYear = computed(() => `${new Date().getFullYear()}`)
const hidden = ref(true)

// Vue router's afterEach guard nav's callback removal function
let removeAfterEachHook: () => void

const element = getElement(props.scrollTarget)
const { scrollY } = useScroll(element)

const onScroll = () => {
  hidden.value = element.scrollHeight - element.clientHeight - props.threshold > scrollY.value
}

watch(scrollY, () => { onScroll() })

removeAfterEachHook = router.afterEach(() => { nextTick(onScroll) })

onMounted(() => {
  // initialize
  onScroll()
})

onBeforeUnmount(() => {
  if (removeAfterEachHook) {
    removeAfterEachHook()
  }
})
</script>
