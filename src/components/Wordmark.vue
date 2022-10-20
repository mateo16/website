<style scoped>
.wordmark {
  font-size: 1rem;
  text-transform: uppercase;
  line-height: 1rem;
}

.wordmark-section-1 {
  font-weight: 900;
}

.wordmark-section-2 {
  font-weight: 300;
}
</style>

<template>
  <div
    class="wordmark"
    :class="{ 'no-pointer-events': noInteraction, 'link': !noInteraction }"
  >
    <span class="wordmark-section-1">rockin</span>
    <span class="wordmark-section-2">dev</span>
  </div>
</template>

<script setup lang="ts">
const {
  noInteraction = false,
} = defineProps<{
  noInteraction?: boolean
}>()
</script>
