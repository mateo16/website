<style scoped>
.section {
  display: flex;

  background-color: var(--background-color);
  padding: var(--content-margin);
}

.text-pane {
  max-width: 20rem;
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
  <section id="stack" class="section pos-relative full-page">
    <DualPaneLayout style="z-index: 1" alignment="center">
      <template #title>
        <h1 class="color-text">{{ landing.stack.title }}</h1>
      </template>

      <template #first-pane>
        <span ref="text" class="flex-col flex-center text-pane text-center fade" />
      </template>

      <template #second-pane>
        <SpinnerCarousel
          ref="carousel"
          :images="images"
        />
      </template>
    </DualPaneLayout>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import landing from 'assets/copy/en/landing.yml'
import SpinnerCarousel from '@/components/landing/SpinnerCarousel.vue'

const text: HTMLElement = $ref()
const carousel = $ref<typeof SpinnerCarousel>()
const images = landing.stack.content.map((e: { text: string, image: string } ) => e.image)

let currentContentIdx = 0

function update() {
  const state = landing.stack.content[currentContentIdx]
  text.innerHTML = state.text
}

const doContentTransition = () => {
  currentContentIdx += 1
  if (currentContentIdx === landing.stack.content.length) {
    currentContentIdx = 0
  }

  update()

  carousel.cycle()
}

onMounted(() => {
  text.addEventListener('animationiteration', doContentTransition)
  update()
})

onBeforeUnmount(() => {
  text.removeEventListener('animationiteration', doContentTransition)
})
</script>
