<style scoped>
.section {
  display: flex;

  color: #000;
  background-color: #ddd;
  padding: 2rem var(--content-margin);

  scroll-snap-align: start;
}

.text-pane {
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
        <IntersectionContainer animation-name="fade-in" margin="-10px" style="opacity: 0">
          <span class="landing-title">{{ landing.stack.title }}</span>
        </IntersectionContainer>
      </template>

      <template #first-pane>
        <span ref="text" class="text-pane landing-text fade" />
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
