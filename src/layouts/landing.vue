<style>
.loading {
  position: absolute;
  top: 6rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: .8rem;
  letter-spacing: .1rem;
  animation-name: glow;
  animation-iteration-count: infinite;
  animation-duration: 400ms;
  animation-fill-mode: both;
  animation-direction: alternate;
}
</style>

<template>
  <VideoBackground autoplay :src="video" @playback-started="loading = false" />
  <span class="loading" v-if="loading">{{ landing.hero.loading }}</span>
  <router-view />
  <Footer />
  <Nav />
  <Notification />
</template>

<script setup lang="ts">
import { useColorSchemeManager } from '@/lib/colorScheme'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import video from 'assets/video/apsis-hero_1000kbps.mp4'
import landing from 'assets/copy/en/landing.yml'

const loading = ref(true)

const schemeManager = useColorSchemeManager()

onMounted(() => { schemeManager.setDark() })

onBeforeUnmount(() => { schemeManager.setAuto() })
</script>
