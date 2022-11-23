<template>
  <VideoBackground :src="video" :loading-text="landing.hero.loading" autoplay />

  <HeroSection />
  <AboutSection />
  <ProjectsSection />
  <TechStackSection />
  <ContactSection />
</template>

<route lang="yaml">
name: landing
meta:
  layout: landing
</route>

<script lang="ts">
export default {
  name: 'LandingPage'
}
</script>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onMounted, onBeforeUnmount } from 'vue'
import { getAppConfig } from '@/lib/config'
import { useColorSchemeManager } from '@/lib/colorScheme'
import copy from 'assets/copy/en/app.yml'
import video from 'assets/video/hero_1000kbps.mp4'
import landing from 'assets/copy/en/landing.yml'

const config = getAppConfig()

const schemeManager = useColorSchemeManager()

useHead({
  htmlAttrs: { lang: copy.locale },
  title: `${copy.company.name} | ${copy.company.tagline}`,
  meta: [
    { property: 'og:locale', content: copy.locale },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: config.appUrl },
    { property: 'og:site_name', content: copy.company.name },
    { property: 'og:title', content: copy.company.name },
    { property: 'og:description', content: copy.company.tagline },
    { property: 'og:image', content: `${config.appUrl}/img/banner.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
  ]
})

onMounted(() => { schemeManager.setDark() })

onBeforeUnmount(() => { schemeManager.setAuto() })
</script>
