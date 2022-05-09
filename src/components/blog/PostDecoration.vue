<style scoped>
.deco {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  transform-origin: top center;
}

.deco1 {
  height: 80%;
  transition: all .3s ease-in-out;
}

.deco2 {
  height: 30%;
  transition: all .3s ease-in-out;
}

.hidden {
  transform: scaleY(0);
}
</style>

<template>
  <svg :class="`deco deco1 ${hidden1 ? 'hidden' : ''}`" viewBox="0 0 1280 655" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="Gradient1" gradientTransform="rotate(90)">
        <stop offset="0%" stop-color="var(--accent-color)" stop-opacity=".6" />
        <stop offset="100%" stop-color="var(--accent-color)" stop-opacity=".1" />
      </linearGradient>
    </defs>
    <path d="M0 654.5V0H1280V225.5C934 281 478 654.5 0 654.5Z" fill="url(#Gradient1)"/>
  </svg>

  <svg :class="`deco deco2 ${hidden2 ? 'hidden' : ''}`" viewBox="0 0 1280 339"  preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0V339C532.889 339 832.5 111 1280 111V0H0Z" fill="var(--accent-color)" opacity=".4" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useScroll from '@/lib/composable/scroll'
import { getElement } from '@/lib/element'

const props = defineProps({
  scrollTarget: {
    type: String,
    required: true
  },
  threshold1: {
    type: Number,
    required: false,
    default: 80
  },
  threshold2: {
    type: Number,
    required: false,
    default: 50
  }
})

const element = getElement(props.scrollTarget)
const { scrollY } = useScroll(element)
const hidden1 = computed(() => scrollY.value > props.threshold1)
const hidden2 = computed(() => scrollY.value > props.threshold2)
</script>
