<style scoped>
.container {
  position: relative;
  gap: .5rem;
}

.dot {
  position: relative;
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
  background-color: var(--muted-text-color);
  transition: background 200ms linear;
}

.active {
  background-color: var(--text-color);
  pointer-events: none;
}

@media (--hover) {
  .dot:hover {
    cursor: pointer;
  }
}
</style>

<template>
  <div class="container flex-row">
    <div
      :class="`dot ${(i - 1) === props.index ? 'active' : ''}`"
      v-for="i of props.count"
      @click="emit('selected', i - 1)"
    />
  </div>
</template>

<script setup lang="ts">
// import { computed, ref } from 'vue'

const emit = defineEmits(['selected'])

const props = defineProps({
  count: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>
