<style scoped>
.logo-container {
  pointer-events: all;
}

.logo {
  transform-origin: 50% 56%;
}

@media (--hover) {
  .logo-container:hover {
    cursor: pointer;
  }
}
</style>

<template>
  <div
    ref="logoContainer"
    class="logo-container pos-relative flex-row flex-center"
    :style="`${noInteraction ? 'pointer-events: none;' : ''} ${width ? `width: ${width}` : ''}`"
  >
    <svg
      ref="logo"
      class="logo"
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      stroke="none"
      :fill="color"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M478.951 59L322.148 59C293.288 148.664 254.546 236.656 205.54 321.538C156.481 406.51 99.5792 484.132 36.2771 554.017L114.71 689.766C198.226 603.31 272.622 505.348 335.444 396.538C398.222 287.802 445.84 174.474 478.951 59Z" />
      <path d="M685.797 689.053L764.161 553.214C700.969 483.409 644.16 405.888 595.172 321.039C546.257 236.314 507.568 148.491 478.724 59L321.904 59C355.01 174.301 402.58 287.459 465.268 396.038C528.038 504.759 602.363 602.649 685.797 689.053Z" />
      <path d="M764.045 553.414C647.575 524.401 525.72 509 400.269 509C274.64 509 152.619 524.444 36 553.537L114.449 689.315C206.577 669.456 302.202 659 400.269 659C498.196 659 593.687 669.427 685.694 689.231L764.045 553.414Z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const {
  width = '1.8rem',
  color = 'currentColor',
  noInteraction = false,
  animationClass
} = defineProps<{
  width?: string
  color?: string
  noInteraction?: boolean
  animationClass?: string
}>()

const logoContainer = $ref<HTMLElement>()
const logo = $ref<HTMLElement>()

let animating = false

useEventListener($$(logoContainer), 'mouseenter', () => {
  if (!animating && animationClass) {
    logo.classList.add(animationClass)
    animating = true
  }
})

useEventListener($$(logo), 'animationend', () => {
  if (animationClass) {
    logo.classList.remove(animationClass)
  }
  animating = false
})
</script>
