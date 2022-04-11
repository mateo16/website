<style scoped>
.section {
  color: black;
  justify-content: flex-start;
  align-items: center;
  padding-top: 25vh;
  align-content: center;
  flex-direction: column;

  background-image: url('@/assets/images/joshua-tree.jpg');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
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
  bottom: 2rem;
  right: .4rem;
}
</style>

<template>
  <div class="full-page section">
    <span class="text">{{landing.callToAction.title}}</span>
    <Button
      :text="landing.callToAction.button"
      @click="router.push('/contact')"
    />
  </div>
  <span class="photo-caption">{{ landing.callToAction.photoCaption }}</span>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import landing from '@/assets/copy/en/landing.yml'

const router = useRouter()

onMounted(() => {
})

onBeforeUnmount(() => {
})
</script>
