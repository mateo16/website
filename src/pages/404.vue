<template>
  <div class="content-section pos-relative flex-col flex-center">
    <h1 class="text-center">{{ copy.error.notFound.title }}</h1>
    <h3 class="text-center" style="margin-bottom: 2rem">{{ copy.error.notFound.caption }}</h3>

    <Button :text="copy.error.notFound.home" to="/" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import copy from 'assets/copy/en/app.yml'

useHead({
  htmlAttrs: { lang: copy.locale },
  title: `${copy.company.name} | ${copy.error.notFound.title}`
})
</script>
