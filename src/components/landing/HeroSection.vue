<style scoped>
.marquee {
  position: relative;
  display: block;
  text-align: center;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;

  animation-name: marquee-anim;
  animation-duration: 2s;
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
    font-weight: 100;
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
  <section class="full-page pos-relative flex-col flex-center flex-gap scroll-snap-align-start">
    <div class="flex-col flex-center flex-wrap">
      <h2 class="text-center">{{ landing.hero.marquee.title }}</h2>
      <h1 ref="marquee" class="marquee text-center">{{ marqueeText }}</h1>
      <h2 class="text-center">{{ landing.hero.marquee.title2 }}</h2>
      <h4 class="text-center content-section">{{ landing.hero.description }}</h4>
    </div>


    <Button :text="landing.hero.cta" @click="router.push({ path: '/', hash: '#contact'})" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { rotateForward } from '@/lib/utils'
import { useRouter } from 'vue-router'
import landing from 'assets/copy/en/landing.yml'

const router = useRouter()
let marqueeActiveIndex = $ref(0)
const marquee: HTMLElement = $ref()

const marqueeText = computed(() => landing.hero.marquee.verticals[marqueeActiveIndex])

const doMarqueeTransition = () => {
  marqueeActiveIndex = rotateForward(marqueeActiveIndex, landing.hero.marquee.verticals.length)
}

onMounted(() => { marquee.addEventListener('animationiteration', doMarqueeTransition) })

onBeforeUnmount(() => { marquee.removeEventListener('animationiteration', doMarqueeTransition) })
</script>
