<style scoped>
.circuits {
  height: 100%;
  top: 0;
  left: 0;
  color: var(--highlighted-callout-color);
  stroke-width: var(--decoration-line-thickness);
}
</style>

<template>
  <Circuits class="circuits pos-absolute" />
</template>

<script setup lang="ts">
import Circuits from 'assets/icons/circuits.svg?component'
</script>
