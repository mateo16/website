<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: .1rem;
  background: linear-gradient(.25turn, #0000, var(--accent-color));

  transition: opacity 200ms linear, width 200ms ease-out;
  transform-origin: top left;
}

.hidden {
  opacity: 0;
}
</style>

<template>
  <div
    :style="`width: ${width}%`"
    :class="`progress ${hidden ? 'hidden' : ''}`"
  />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const threshold = 30;
const hidden = ref(false)

const props = defineProps({
  showBackground: {
    type: Boolean,
    default: false,
    required: false
  },
  scrollTarget: {
    type: String,
    default: null,
    required: false
  }
})

const width = ref(0)

const onScroll = () => {
  const scrollPos = element ? element.scrollTop : window.scrollY
  hidden.value = scrollPos < threshold
  width.value = element ? element.scrollTop / (element.scrollHeight - element.clientHeight) * 100.0 : 0
}

let element: HTMLElement | null

onMounted(() => {
  if (props.scrollTarget) {
    element = document.getElementById(props.scrollTarget)
    if (!element) {
      console.error(`Element with id "${props.scrollTarget}" not found`)
      throw new Error(`Element with id "${props.scrollTarget}" not found`)
    }
    element.addEventListener('scroll', onScroll)
  } else {
    window.addEventListener('scroll', onScroll)
  }
})

onBeforeUnmount(() => {
  if (element) {
    element.removeEventListener('scroll', onScroll)
  } else {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>
