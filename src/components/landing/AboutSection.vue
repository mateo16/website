<style scoped>
.section {
  color: black;
  padding: 2rem var(--content-margin);

  background-color: #ddd;
  background-image: url('@/assets/images/girl-on-whiteboard.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  justify-content: flex-start;
  align-items: center;

  scroll-snap-align: start;
}
</style>

<template>
  <section class="section full-page flex-col non-selectable">
    <IntersectionContainer animation-name="slide-in-left" margin="-10px" style="opacity: 0">
      <span class="landing-title" style="margin-bottom: 3rem">{{ landing.about.title }}</span>
    </IntersectionContainer>
    <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .2s">
      <span class="landing-text">{{ landing.about.text }}</span>
    </IntersectionContainer>
    <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .4s">
      <span class="landing-text">{{ landing.about.text2 }}</span>
    </IntersectionContainer>
    <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .6s">
      <span class="landing-text">{{ landing.about.text3 }}</span>
    </IntersectionContainer>
  </section>
</template>

<script setup lang="ts">
import landing from '@/assets/copy/en/landing.yml'
</script>
