<style scoped>
.hero-text-container {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  line-height: 3.4rem;
  font-weight: 200;
}

@media (--res-mobile) {
  .hero-text-container {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
}

.marquee {
  position: relative;
  text-align: center;
  font-weight: 900;

  animation-name: marquee-anim;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

@keyframes marquee-anim {
  0% {
    transform: translateY(-3rem) scale(.4);
    opacity: 0;
  }
  10% {
    transform: translateY(0) scale(1);
    font-weight: 900;
    opacity: 1;
  }
  90% {
    transform: translateY(0) scale(1.2);
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
</style>

<template>
  <div class="full-page">
    <VideoBackground :src="video" autoplay />

    <!-- TODO: make moving text -->
    <div class="hero-text-container">
      <span>we power</span>
      <span ref="marquee" class="marquee" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import landing from '@/assets/copy/en/landing.yml'
import video from '@/assets/video/apsis_hero_1000kbps.mp4'

let currentMarqueeState = 0

const marquee = ref()

const doMarqueeTransition = () => {
  const state = landing.marquee[currentMarqueeState]
  marquee.value.style.color = state.color
  marquee.value.innerHTML = state.text
  currentMarqueeState += 1
  if (currentMarqueeState === landing.marquee.length) {
    currentMarqueeState = 0
  }
}

onMounted(() => {
  doMarqueeTransition()
  marquee.value.addEventListener('animationiteration', doMarqueeTransition)
})

onBeforeUnmount(() => {
  marquee.value.removeEventListener('animationiteration', doMarqueeTransition)
})
</script>
