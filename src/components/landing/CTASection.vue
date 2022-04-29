<style scoped>
.section {
  padding: 2rem var(--content-margin);
  justify-content: flex-start;
  align-items: center;

  color: black;
  background-image: url('@/assets/images/joshua-tree.jpg');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;

  scroll-snap-align: start;
}

.content {
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.text {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
}

.photo-caption {
  position: absolute;
  font-size: .6rem;
  font-weight: 200;
  letter-spacing: 0.04rem;
  text-shadow: 1px 1px 2px #0008;
  color: var(--muted-text-color);
  transform-origin: top right;
  transform: rotate(90deg);
  bottom: 2rem;
  right: 0;
}
</style>

<template>
  <section class="full-page flex-col section non-selectable">
    <div class="content">
      <span class="text">{{landing.callToAction.title}}</span>
      <Button
        :text="landing.callToAction.button"
        @click="router.push('/contact')"
      />
    </div>

    <span class="photo-caption">{{ landing.callToAction.photoCaption }}</span>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import landing from '@/assets/copy/en/landing.yml'

const router = useRouter()
</script>
