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
  <div
    ref="container"
    :style="props.debug ? 'outline: 1px solid cyan' : ''"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

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
  margin: {
    type: String,
    required: false,
    default: undefined
  },
  once: {
    type: Boolean,
    required: false,
    default: false
  },
  debug: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['intersected'])

const container = $ref<HTMLElement>()
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      container.classList.add(props.animationName)
      if (props.once) {
        observer?.disconnect()
        observer = null
      }
      emit('intersected')
    } else {
      container.classList.remove(props.animationName)
    }
  }, {
    root: null,
    rootMargin: props.margin ? props.margin : '0px',
    threshold: props.threshold
  })

  observer.observe(container)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
