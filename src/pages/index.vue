<style scoped>
</style>

<template>
  <UnderConstruction />
</template>

<route lang="yaml">
meta:
  layout: landing
</route>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import copy from '@/assets/copy/en/app.yml'

useHead({
  title: copy.home.title
})
</script>
