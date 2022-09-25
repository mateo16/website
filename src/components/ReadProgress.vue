<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: .15rem;
  background: var(--main-gradient);

  transition: width 200ms ease-out;
  transform-origin: top left;
}
</style>

<template>
  <div class="progress" :style="`width: ${width}%`" />
</template>

<script setup lang="ts">
import { useWindowScrollPos } from '@/lib/composable/scroll'

const body = window.document.body

const { scrollY } = $(useWindowScrollPos())
const width = $computed(() => scrollY / (body.scrollHeight - body.clientHeight) * 100.0)
</script>
