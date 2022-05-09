<style scoped>
.section {
  scroll-snap-align: start;
}

.marquee {
  position: relative;
  display: block;
  width: 100%;
  text-align: center;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;

  animation-name: marquee-anim;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

@keyframes marquee-anim {
  0% {
    transform: translateY(-3rem) scale(.4);
    opacity: 0;
  }
  10% {
    transform: translateY(0) scale(.8);
    font-weight: 900;
    opacity: 1;
  }
  90% {
    transform: translateY(0) scale(1);
    letter-spacing: 0.5rem;
    font-weight: 200;
    opacity: 1;
  }
  100% {
    transform: translateY(3rem);
    letter-spacing: 2rem;
    opacity: 0;
  }
}

.loading {
  position: absolute;
  top: 6rem;
  font-size: .8rem;
  letter-spacing: .1rem;
  animation-name: glow;
  animation-iteration-count: infinite;
  animation-duration: 400ms;
  animation-fill-mode: both;
  animation-direction: alternate;
}

@keyframes glow {
  from { opacity: 0.5; }
  to { opacity: 1.0; }
}
</style>

<template>
  <section class="section full-page flex-col flex-center non-selectable">
    <VideoBackground autoplay :src="video" @playback-started="loading = false" />

    <span class="loading" v-if="loading">{{ landing.hero.loading }}</span>

    <span class="landing-title">{{ landing.hero.marquee.title }}</span>

      <!-- :style="`color: ${marqueeColor}`" -->
    <span
      ref="marquee"
      style="margin-bottom: 4rem; color: var(--accent-color)"
      class="marquee landing-title"
    >
      {{ marqueeText }}
    </span>

      <!-- :color="marqueeColor" -->
    <Button
      :text="landing.hero.cta"
      to="/contact"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import landing from '@/assets/copy/en/landing.yml'
import video from '@/assets/video/apsis-hero_1000kbps.mp4'

const marqueeActiveIndex = ref(0)
const marquee = ref()
const loading = ref(true)

const marqueeColor = computed(() => landing.hero.marquee.elements[marqueeActiveIndex.value].color)
const marqueeText = computed(() => landing.hero.marquee.elements[marqueeActiveIndex.value].text)

const doMarqueeTransition = () => {
  let index = marqueeActiveIndex.value + 1
  if (index === landing.hero.marquee.elements.length) {
    index = 0
  }
  marqueeActiveIndex.value = index
}

onMounted(() => {
  marquee.value.addEventListener('animationiteration', doMarqueeTransition)
})

onBeforeUnmount(() => {
  marquee.value.removeEventListener('animationiteration', doMarqueeTransition)
})
</script>
