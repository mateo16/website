<style scoped>
.container {
  display: flex;
  position: relative;
  flex-direction: row;
  gap: .5rem;
}

.dot {
  position: relative;
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
  border: 1px solid var(--background-color);
  background-color: var(--border-color);
  transition: background 200ms linear;
  box-shadow: inset;
}

.active {
  background-color: var(--text-color);
}

@media (--hover) {
  .dot:hover {
    cursor: pointer;
  }
}
</style>

<template>
  <div class="container">
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
