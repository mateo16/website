<style scoped>
.section {
  color: #000;
  background-color: #ddd;

  padding-top: 3rem;
  padding-bottom: 2rem;
}

.title {
  width: 100%;
  display: block;
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: .14rem;
  line-height: 3rem;
}

.text {
  display: block;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  max-width: 25rem;
  margin-bottom: 2rem;
}

.fade {
  animation-name: fade;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
}

@keyframes fade {
  0% { opacity: 0; }
  5% { opacity: 1; }
  92% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes fall {
  0% {
    top: -15%;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 100%;
  }
}

.deco-hexa {
  /* fill: #000; */
  position: absolute;

  animation: fall;
  animation-fill-mode: backwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
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
</style>

<template>
  <div class="full-page section">
    <DualPaneLayout>
      <template #title>
        <span class="title">{{ landing.stack.title }}</span>
      </template>

      <template #first-pane>
        <span ref="text" class="text fade" />
      </template>

      <template #second-pane>
        <SpinnerCarousel
          ref="carousel"
          :images="landing.stack.content.map((e: {image: string}) => e.image)"
        />
      </template>
    </DualPaneLayout>

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

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import landing from '@/assets/copy/en/landing.yml'

const text = ref()
const carousel = ref()

let currentContentIdx = 0

function update() {
  const state = landing.stack.content[currentContentIdx]
  text.value.innerHTML = state.text
}

const doContentTransition = () => {
  currentContentIdx += 1
  if (currentContentIdx === landing.stack.content.length) {
    currentContentIdx = 0
  }

  update()

  carousel.value.cycle()
}

onMounted(() => {
  text.value.addEventListener('animationiteration', doContentTransition)
  update()
})

onBeforeUnmount(() => {
  text.value.removeEventListener('animationiteration', doContentTransition)
})
</script>
