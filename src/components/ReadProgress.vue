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
import { ref, watchEffect } from 'vue'
import useScroll from '@/lib/composable/scroll'
import { getElement } from '@/lib/element'

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

const hidden = ref(false)
const width = ref(0)

const element = getElement(props.scrollTarget)

const { scrollY } = useScroll(element)

watchEffect(() => {
  const scrollPos = scrollY.value
  hidden.value = scrollPos < props.threshold
  width.value = element ? element.scrollTop / (element.scrollHeight - element.clientHeight) * 100.0 : 0
})
</script>
