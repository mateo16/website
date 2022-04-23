<style scoped>
.section {
  color: black;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  flex-direction: column;
  padding: 0 var(--content-margin);

  background-color: #ddd;
  background-image: url('@/assets/images/girl-on-whiteboard.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  scroll-snap-align: start;
}

.title {
  position: relative;
  display: block;
  width: 100%;
  padding: 2rem 0;
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: .14rem;
  line-height: 3rem;
}

.text {
  position: relative;
  display: block;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6rem;
  max-width: 25rem;
  padding-bottom: 2rem;
}
</style>

<template>
  <section class="full-page section non-selectable">
    <IntersectionContainer animation-name="slide-in-left" margin="-10px" style="opacity: 0">
      <span class="title">{{ landing.about.title }}</span>
    </IntersectionContainer>
    <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .2s">
      <span class="text">{{ landing.about.text }}</span>
    </IntersectionContainer>
    <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .4s">
      <span class="text">{{ landing.about.text2 }}</span>
    </IntersectionContainer>
    <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .6s">
      <span class="text">{{ landing.about.text3 }}</span>
    </IntersectionContainer>
  </section>
</template>

<script setup lang="ts">
import landing from '@/assets/copy/en/landing.yml'
</script>
