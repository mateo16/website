<style scoped>
.deco {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  transition: all .5s ease-in-out;
  transform-origin: top left;
}

.deco1 {
  height: 80%;
  transition-delay: .1s;
}

.deco2 {
  height: 30%;
}

.hidden {
  transform: scaleY(0);
}
</style>

<template>
  <svg
    class="deco deco1"
    :class="{ hidden }"
    viewBox="0 0 1280 655"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="0%" stop-color="var(--main-gradient-start-color)" stop-opacity=".3" />
        <stop offset="100%" stop-color="var(--main-gradient-stop-color)" stop-opacity=".05" />
      </linearGradient>
    </defs>
    <path d="M0 654.5V0H1280V225.5C934 281 478 654.5 0 654.5Z" fill="url(#gradient)"/>
  </svg>

  <svg
    class="deco deco2"
    :class="{ hidden }"
    viewBox="0 0 1280 348"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0V339C521 402 832.5 111 1280 111V0H0Z" fill="var(--text-color)" opacity=".1" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScrollPos } from '@/lib/composable/scroll'

const props = defineProps({
  threshold: {
    type: Number,
    required: false,
    default: 50
  }
})

const { scrollY } = $(useWindowScrollPos())
const hidden = computed(() => scrollY > props.threshold)
</script>
