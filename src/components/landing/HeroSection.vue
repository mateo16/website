<style scoped>
.hero-text-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  text-transform: uppercase;
  font-size: 2.6rem;
  letter-spacing: 0.2rem;
  line-height: 3.4rem;
  font-weight: 300;
  width: 100%;
}

@media (--res-mobile) {
  .hero-text-container {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
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
  top: 10rem;
  font-size: .8rem;
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
  <div class="full-page">
    <VideoBackground
      autoplay
      :src="video"
      @playback-started="loading = false"
    />

    <!-- TODO: make moving text -->
    <div class="hero-text-container">
      <span class="loading" v-if="loading">loading...</span>
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

const loading = ref(true)

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
