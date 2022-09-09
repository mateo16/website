<template>
  <section class="section pos-relative full-page flex-col flex-center non-selectable">
    <div class="content flex-col flex-center">
      <IntersectionContainer animation-name="slide-in-left" margin="-10px" style="opacity: 0">
        <h1 class="gradient-text">{{ landing.about.title }}</h1>
      </IntersectionContainer>
      <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .2s">
        <p class="text-center">{{ landing.about.text }}</p>
      </IntersectionContainer>
      <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .4s">
        <p class="text-center">{{ landing.about.text2 }}</p>
      </IntersectionContainer>
      <IntersectionContainer animation-name="slide-in-left" style="opacity: 0; animation-delay: .6s">
        <p class="text-center">{{ landing.about.text3 }}</p>
      </IntersectionContainer>
    </div>
  </section>
</template>

<script setup lang="ts">
import landing from 'assets/copy/en/landing.yml'
</script>
