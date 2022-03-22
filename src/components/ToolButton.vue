<style scoped>
.tool-button {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: background 150ms ease-out;
}

.tool-button-disabled {
  color: var(--border-color);
  pointer-events: none;
  cursor: default;
}

@media (--hover) {
  .tool-button:hover {
    background: #0001;
  }
}

.tool-button:active {
  /* color: var(--background-color); */
  background: #0004;
}

.tool-button-text {
  font-size: 0.6rem;
  line-height: 0.6rem;
  text-transform: uppercase;
  text-align: center;
  padding-top: 0.7rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.icon {
  position: relative;
}
</style>

<template>
  <div
    ref="toolButton"
    :style="style_"
    :class="'tool-button' + (enabled ? '' : ' tool-button-disabled')"
  >
    <div class="icon" :style="`width: ${iconHeight}; height: ${iconHeight}`">
      <slot />
    </div>
    <span v-if="text" class="tool-button-text non-breaking-text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: false,
    default: ''
  },
  color: {
    type: String,
    required: false,
    default: ''
  },
  enabled: {
    type: Boolean,
    required: false,
    default: true
  },
  rounded: {
    type: Boolean,
    required: false,
    default: false
  },
  height: {
    type: String,
    required: false,
    default: '5rem'
  },
  iconHeight: {
    type: String,
    required: false,
    default: '2rem'
  }
})

const toolButton = ref()

const style_ = computed(() =>
  `${props.color ? `color: ${props.color};` : ''}` +
  `height: ${props.height};` +
  `min-width: ${props.height};` +
  `border-radius: ${props.rounded ? '50%' : '0.2rem'};`
)
</script>
