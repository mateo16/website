<style scoped>
.logo {
  position: relative;
}

.a-frame {
  stroke-width: 150px;
  transition: stroke 150ms linear;
}

@media (--hover) {
  .a-frame:hover {
    stroke: var(--accent-color);
  }

  .logo:hover {
    cursor: pointer;
  }
}

.animate {
  animation-name: rotate;
  animation-duration: 6s;
  animation-delay: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transform-origin: 50% 56%;
}

@keyframes rotate {
  0%   { transform: rotate(0); }
  10%  { transform: rotate(360deg); }
  100% { transform: rotate(360deg); }
}
</style>

<template>
  <div
    :class="`logo flex-row ${props.animate ? 'animate' : ''}`"
    :style="`${props.width ? `width: ${props.width}` : ''}`"
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="a-frame"
        :stroke="props.color"
        stroke-linejoin="bevel"
        d="M404 118C341 320 243.5 489 118 613C294.5 574.5 488.944 572.667 690 613C557 471.5 466 321.5 404 118Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '',
    required: false
  },
  color: {
    type: String,
    default: 'currentColor',
    required: false
  },
  animate: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
