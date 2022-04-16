<style scoped>
.section {
  scroll-snap-align: start;
}

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
  <section class="section full-page non-selectable">
    <VideoBackground
      autoplay
      :src="video"
      @playback-started="loading = false"
    />

    <!-- TODO: make moving text -->
    <div class="hero-text-container">
      <span class="loading" v-if="loading">loading...</span>
      <span>{{ landing.hero.marquee.title }}</span>
      <span ref="marquee" class="marquee" :style="`color: ${marqueeColor}`">{{ marqueeText }}</span>
      <br />
      <Button
        :text="landing.hero.cta"
        :color="marqueeColor"
        @click="router.push('/contact')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import landing from '@/assets/copy/en/landing.yml'
import video from '@/assets/video/apsis-hero_1000kbps.mp4'

const router = useRouter()
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
