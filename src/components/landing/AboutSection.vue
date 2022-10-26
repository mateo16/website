<style scoped>
.section {
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 2rem;
}

.card-container {
  justify-content: space-around;
  align-items: stretch;
  gap: 3rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 12rem;
}
</style>

<template>
  <section id="about" class="section pos-relative full-page flex-col scroll-snap-y-soft scroll-snap-align-start">
    <IntersectionContainer once animation-name="slide-in-left" style="opacity: 0">
      <h1 class="color-text">{{ landing.about.title }}</h1>
    </IntersectionContainer>

    <div class="card-container flex-row flex-wrap">

      <IntersectionContainer once animation-name="slide-in-bottom" style="opacity: 0; animation-delay: .1s">
        <div class="card text-center">
          <Diamond />
          <h2>{{ landing.about.title1 }}</h2>
          <span v-html="landing.about.text1"></span>
        </div>
      </IntersectionContainer>

      <IntersectionContainer once animation-name="slide-in-bottom" style="opacity: 0; animation-delay: .3s">
        <div class="card text-center">
          <Cogs />
          <h2>{{ landing.about.title2 }}</h2>
          <span v-html="landing.about.text2"></span>
        </div>
      </IntersectionContainer>

      <IntersectionContainer once animation-name="slide-in-bottom" style="opacity: 0; animation-delay: .5s">
        <div class="card text-center">
          <Compass />
          <h2>{{ landing.about.title3 }}</h2>
          <span v-html="landing.about.text3"></span>
        </div>
      </IntersectionContainer>
    </div>
  </section>
</template>

<script setup lang="ts">
import landing from 'assets/copy/en/landing.yml'
</script>
