<style scoped>
</style>

<template>
  <h1>{{copy.title}}</h1>
  <p>{{ copy.caption }}</p>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import copy from '@/assets/copy/en/404.yml'

useHead({
  title: `${copy.title}`
})
</script>
