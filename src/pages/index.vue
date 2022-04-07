<style scoped>
</style>

<template>
  <HeroSection />
  <TechStackSection />
</template>

<route lang="yaml">
meta:
  layout: landing
</route>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import copy from '@/assets/copy/en/app.yml'
import { getAppConfig } from '@/lib/config'

const config = getAppConfig()

useHead({
  title: `${copy.company} | ${copy.landing.description}`,

  // OpenGraph config
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: config.appUrl },
    { property: 'og:site_name', content: copy.company },
    { property: 'og:title', content: copy.company },
    { property: 'og:description', content: copy.landing.description },
    { property: 'og:image', content: `${config.appUrl}/img/apsis-wordmark.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '500' },
    { property: 'og:locale', content: 'en_US' },
  ]
})
</script>
