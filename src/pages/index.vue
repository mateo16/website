<style scoped>
.hexagon {
  position: absolute;
  fill: hsl(0deg 0% 40% / 10%);

  animation: fall;
  animation-fill-mode: backwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  user-select: none;
}

@keyframes fall {
  0% {
    top: -5%;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 70%;
  }
}

.hexagon-container {
  overflow-x: hidden;
}
</style>

<template>
  <VideoBackground :src="video" :loading-text="landing.hero.loading" autoplay />

  <HeroSection />
  <AboutSection />
  <PortfolioSection />
  <div class="hexagon-container pos-relative scroll-snap-y-soft scroll-snap-align-start">
    <TechStackSection />
    <ContactSection />

    <Hexagon
      v-for="_ in hexagonCount"
      class="hexagon"
      :style="hexagonStyle()"
    />
  </div>
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
import { getAppConfig } from '@/lib/config'
import { randomInt, randomNumber } from '@/lib/utils'
import copy from 'assets/copy/en/app.yml'
import Hexagon from 'assets/icons/hexagon.svg'
import video from 'assets/video/apsis-hero_1000kbps.mp4'
import landing from 'assets/copy/en/landing.yml'

const config = getAppConfig()

const hexagonCount = 12

const hexagonStyle = () => `left: ${randomInt(10, 90)}%;` +
                           `height: ${randomInt(2, 8)}rem;` +
                           `animation-duration: ${randomInt(20, 300)}s;` +
                           `animation-delay: ${randomInt(-80, 0)}s;` +
                           `opacity: ${randomNumber(0.1, 1)};`

useHead({
  htmlAttrs: { lang: copy.locale },
  title: `${copy.company} | ${copy.landing.description}`,
  meta: [
    { property: 'og:locale', content: copy.locale },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: config.appUrl },
    { property: 'og:site_name', content: copy.company },
    { property: 'og:title', content: copy.company },
    { property: 'og:description', content: copy.landing.description },
    { property: 'og:image', content: `${config.appUrl}/img/banner.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
  ]
})
</script>
