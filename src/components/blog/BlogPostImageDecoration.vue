<style scoped>
.wrapper {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;

  pointer-events: none;
  transition: all .5s ease-in-out;
  transform-origin: top center;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.decoration {
  position: absolute;
  height: 100%;
  width: 100%;
}

.overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--background-color);
  opacity: 0.7;
}

.hidden {
  transform: scale(0, 0);
  opacity: 0;
}
</style>

<template>
  <div
    class="wrapper no-pointer-events"
    :class="{ hidden }"
    :style="`background-image: url(${imageUrl})`"
  >
    <div class="overlay pos-absolute" />

    <svg
      class="decoration"
      fill="var(--background-color)"
      stroke="none"
      viewBox="0 0 1280 655"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 655H1280V424.5C787.5 456 478 655 0 655Z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScrollPos } from '@/lib/composable/scroll'

const props = defineProps({
  threshold: {
    type: Number,
    required: false,
    default: 40
  },
  imageUrl: {
    type: String,
    required: true
  }
})

const { scrollY } = $(useWindowScrollPos())
const hidden = computed(() => scrollY > props.threshold)
</script>
