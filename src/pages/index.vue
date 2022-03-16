<style scoped>
</style>

<template>
  <UnderConstruction />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import copy from '@/assets/copy/en/app.yml'

useHead({
  title: copy.home.title
})
</script>
