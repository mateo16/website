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

  font-size: .8rem;
  font-weight: 350;
  letter-spacing: 0.04rem;
}

.card-icon {
  height: 5rem;
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
          <DiamondIcon :class="`card-icon ${props.animateIcons ? 'float' : ''}`" />
          <p class="text-center">{{ landing.about.text1 }}</p>
        </div>
      </IntersectionContainer>

      <IntersectionContainer animation-name="slide-in-bottom" style="opacity: 0; animation-delay: .3s">
        <div class="card">
          <CogsIcon
          :class="`card-icon ${props.animateIcons ? 'float' : ''}`"
            style="animation-delay: .4s;"
          />
          <p class="text-center">{{ landing.about.text2 }}</p>
        </div>
      </IntersectionContainer>

      <IntersectionContainer animation-name="slide-in-bottom" style="opacity: 0; animation-delay: .5s">
        <div class="card">
          <CompassIcon
            :class="`card-icon ${props.animateIcons ? 'float' : ''}`"
            style="animation-delay: .7s;"
          />
          <p class="text-center">{{ landing.about.text3 }}</p>
        </div>
      </IntersectionContainer>

    </div>
  </section>
</template>

<script setup lang="ts">
import landing from 'assets/copy/en/landing.yml'
import DiamondIcon from 'assets/icons/diamond.svg'
import CogsIcon from 'assets/icons/cogs.svg'
import CompassIcon from 'assets/icons/compass.svg'

const props = defineProps({
  animateIcons: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
