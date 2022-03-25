<style scoped>
.logo {
  position: relative;
}

#planets {
  animation-name: rotate;
  animation-duration: 6s;
  animation-delay: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transform-origin: center;
}

@keyframes rotate {
  0%   { transform: rotate(0); }
  15%  { transform: rotate(360deg); }
  100% { transform: rotate(360deg); }
}
</style>

<template>
  <div class="logo flex-row" :style="`${props.width ? `width: ${props.width}` : ''}`">
    <svg viewBox="0 0 800 800" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle
        stroke="currentColor"
        fill="none"
        cx="400"
        cy="400"
        r="290"
        stroke-width="20"
      />
      <g id="planets">
        <circle
          fill="currentColor"
          cx="690"
          cy="405"
          r="30"
        />
        <circle
          fill="currentColor"
          cx="110"
          cy="405"
          r="30"
        />
      </g>
      <g id="A">
        <path
          stroke="currentColor"
          fill="none"
          d="M139 661L400 110L661 661"
          stroke-width="60"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          stroke="currentColor"
          fill="none"
          d="M188 574H609"
          stroke-width="60"
          stroke-linecap="round"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '',
    required: false
  }
})
</script>
