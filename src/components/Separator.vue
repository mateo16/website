<style scoped>
.separator {
  display: block;
  width: 100%;
  border-top: var(--decoration-line-thickness) solid var(--border-color);
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
}
</style>

<template>
  <hr
    class="separator"
    :style="`margin: ${props.margin} auto;`"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  margin: {
    type: String,
    default: '1.5rem',
    required: false
  }
})
</script>
