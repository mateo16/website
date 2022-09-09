<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: .1rem;
  background: var(--main-gradient);

  transition: width 200ms ease-out;
  transform-origin: top left;
}
</style>

<template>
  <div class="progress" :style="`width: ${width}%`" />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useWindowScrollPos } from '@/lib/composable/scroll'

const { scrollY } = $(useWindowScrollPos())

let width = $ref(0)

watchEffect(() => {
  width = scrollY / (document.body.scrollHeight - document.body.clientHeight) * 100.0
})
</script>
