<style scoped>
.logo-container {
  position: relative;
  transform-origin: 50% 56%;
}

.logo {
  transition: stroke 150ms linear;
}

@media (--hover) {
  .logo-container:hover {
    cursor: pointer;
    animation-name: rotate;
    animation-duration: .6s;
    animation-timing-function: ease-in-out;
  }

  .logo:hover {
    stroke: var(--accent-color);
  }
}

@keyframes rotate {
  0%   { transform: rotate(0); }
  100% { transform: rotate(1turn); }
}
</style>

<template>
  <div
    class="logo-container flex-row"
    :style="`${props.noInteraction ? 'pointer-events: none;' : ''} ${props.width ? `width: ${props.width}` : ''}`"
  >
    <svg
      class="logo"
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      fill="none"
      :stroke="props.color"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-width="150"
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
  noInteraction: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
