<style scoped>
.section {
  color: #000;
  background-color: #ddd;

  padding: 2rem 0;

  scroll-snap-align: start;
}

.title {
  width: 100%;
  display: block;
  font-size: 3rem;
  font-weight: 900;
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
</style>

<template>
  <section class="section full-page non-selectable">
    <DualPaneLayout style="z-index: 1">
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
  </section>
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
