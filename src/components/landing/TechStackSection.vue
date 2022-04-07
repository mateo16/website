<style scoped>
.container {
  background-color: #ddd;
  color: #222;
  overflow: hidden;
  position: relative;
  justify-content: flex-start;
}

.title {
  font-size: 2rem;
  text-transform: uppercase;
  line-height: 3rem;
  text-align: center;
  width: 100%;
  margin-top: 3rem;
  font-weight: 800;
  letter-spacing: .06rem;
  z-index: 1;
}

@keyframes cycle {
  0% {
    transform: rotateZ(45deg);
    opacity: 0;
  }
  8% {
    transform: rotateZ(0);
    opacity: 1;
  }
  95% {
    transform: rotateZ(0);
    opacity: 1;
  }
  100% {
    transform: rotateZ(-45deg);
    opacity: 0;
  }
}

.fade {
  animation-name: fade;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.bipane {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 2rem;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  z-index: 1;
}

@media (--res-mobile) {
  .bipane {
    margin: 1rem;
    /* flex-direction: column; */
    justify-content: space-around;
  }
}

.copy {
  flex-grow: 1;
  margin: 0 var(--content-margin);
  text-align: center;
  font-size: 1.1rem;
  font-weight: 400;
  max-width: 20rem;
}

.deco-hexa-1 {
  fill: #000;
  position: absolute;
  left: 10%;
  top: 40%;
  height: 7rem;
  transform: translateY(-5rem);
  opacity: .04;
}

.deco-hexa-2 {
  fill: #000;
  position: absolute;
  left: 20%;
  top: 60%;
  height: 5rem;
  transform: translateY(-5rem);
  opacity: .03;
}

.deco-hexa-3 {
  fill: #000;
  position: absolute;
  left: 40%;
  top: 50%;
  height: 3rem;
  transform: translateY(-5rem);
  opacity: .03;
}

.deco-hexa-4 {
  fill: #000;
  position: absolute;
  left: 23%;
  top: 50%;
  height: 3rem;
  transform: translateY(-5rem);
  opacity: .03;
}
</style>

<template>
  <div class="full-page">
    <div class="container flex-col">
      <svg class="deco-hexa-1" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
      </svg>
      <svg class="deco-hexa-2" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
      </svg>
      <svg class="deco-hexa-3" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
      </svg>
      <svg class="deco-hexa-4" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 0L279.904 75V225L150 300L20.0962 225L20.0962 75L150 0Z" />
      </svg>

      <span class="title">{{ landing.stack.title }}</span>

      <div class="bipane">
        <span ref="copy" class="copy fade" />
        <SpinnerCarousel
          ref="carousel"
          :images="landing.stack.content.map((e: {image: string}) => e.image)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import landing from '@/assets/copy/en/landing.yml'

const copy = ref()
const carousel = ref()

let currentContentIdx = 0

function update() {
  const state = landing.stack.content[currentContentIdx]
  copy.value.innerHTML = state.text
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
  copy.value.addEventListener('animationiteration', doContentTransition)
  update()
})

onBeforeUnmount(() => {
  copy.value.removeEventListener('animationiteration', doContentTransition)
})
</script>
