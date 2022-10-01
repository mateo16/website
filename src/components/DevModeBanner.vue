<style scoped>
.dev-banner {
  background-color: red;
  top: 50%;
  left: 0;
  transform: rotate(180deg) translateY(50%);
  font-size: .6rem;
  line-height: 1em;
  padding: .3rem .1rem;
  writing-mode: vertical-lr;
  opacity: .9;
}
</style>

<template>
  <div v-if="dev" class="pos-fixed dev-banner text-center no-pointer-events">DEVELOPMENT</div>
</template>

<script setup lang="ts">
import { isDevelopment } from '@/lib/config'

const dev = isDevelopment()
</script>
