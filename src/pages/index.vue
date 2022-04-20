<style scoped>
@keyframes fall {
  0% {
    top: -15%;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 70%;
  }
}

.deco-hexa {
  position: absolute;

  animation: fall;
  animation-fill-mode: backwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  user-select: none;
}

.deco-hexa-1 {
  fill: #0002;
  left: 10%;
  height: 7rem;
  opacity: .04;

  animation-duration: 90s;
  animation-delay: -10s;
}

.deco-hexa-2 {
  fill: #0001;
  left: 18%;
  height: 5rem;
  opacity: .03;

  animation-duration: 60s;
  animation-delay: 0s;
}

.deco-hexa-3 {
  fill: #0002;
  left: 30%;
  height: 10rem;
  opacity: .03;

  animation-duration: 45s;
  animation-delay: -5s;
}

.deco-hexa-4 {
  fill: #0002;
  left: 45%;
  height: 4rem;
  opacity: .06;

  animation-duration: 140s;
  animation-delay: -2s;
}

.deco-hexa-5 {
  fill: #0002;
  left: 75%;
  height: 3rem;
  opacity: .06;

  animation-duration: 50s;
  animation-delay: -20s;
}

.anim-container {
  position: relative;
}
</style>

<template>
  <HeroSection />
  <AboutSection />
  <PortfolioSection />
  <div class="anim-container">
    <TechStackSection />
    <CTASection />

    <svg class="deco-hexa deco-hexa-1" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
    </svg>
    <svg class="deco-hexa deco-hexa-2" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
    </svg>
    <svg class="deco-hexa deco-hexa-3" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
    </svg>
    <svg class="deco-hexa deco-hexa-4" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
    </svg>
    <svg class="deco-hexa deco-hexa-5" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
    </svg>
  </div>
</template>

<route lang="yaml">
name: landing
meta:
  layout: landing
</route>

<script lang="ts">
export default {
  name: 'Landing'
}
</script>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { getAppConfig } from '@/lib/config'
import copy from '@/assets/copy/en/app.yml'

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
