<style scoped>
.anim {
  animation: fade-in;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
</style>

<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  animationName: {
    type: String,
    required: true
  },
  threshold: {
    type: Number,
    required: false,
    default: 0.0
  },
  once: {
    type: Boolean,
    required: false,
    default: false
  }
})

const container = ref()
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      container.value.classList.add(props.animationName)
      if (props.once) {
        observer?.disconnect()
        observer = null
      }
    } else {
      container.value.classList.remove(props.animationName)
    }
  }, {
    root: null,
    threshold: props.threshold
  })

  observer.observe(container.value)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
