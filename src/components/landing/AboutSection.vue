<style scoped>
.section {
  justify-content: space-evenly;
  align-items: center;
}

.card-container {
  justify-content: space-around;
  align-items: stretch;
  gap: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  max-width: 14rem;

  font-size: 1rem;
  font-weight: 350;
  letter-spacing: 0.06rem;
}
</style>

<template>
  <section class="section pos-relative full-page flex-col non-selectable">
    <IntersectionContainer animation-name="slide-in-left" margin="-10px" style="opacity: 0">
      <h1 class="gradient-text">{{ landing.about.title }}</h1>
    </IntersectionContainer>

    <div class="card-container flex-row flex-wrap">

      <IntersectionContainer animation-name="slide-in-bottom" style="opacity: 0; animation-delay: .1s">
        <div class="card">
          <Diamond />
          <p class="text-center">{{ landing.about.text1 }}</p>
        </div>
      </IntersectionContainer>

      <IntersectionContainer animation-name="slide-in-bottom" style="opacity: 0; animation-delay: .3s">
        <div class="card">
          <Cogs />
          <p class="text-center">{{ landing.about.text2 }}</p>
        </div>
      </IntersectionContainer>

      <IntersectionContainer animation-name="slide-in-bottom" style="opacity: 0; animation-delay: .5s">
        <div class="card">
          <Compass />
          <p class="text-center">{{ landing.about.text3 }}</p>
        </div>
      </IntersectionContainer>
    </div>
  </section>
</template>

<script setup lang="ts">
import landing from 'assets/copy/en/landing.yml'
</script>
