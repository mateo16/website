<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.background-video {
  object-fit: cover;
}

.video-darken-overlay {
  background-color: #000;
  opacity: 0.6;
}

.video-overlay-texture {
  background-image: url('assets/images/dot-matrix.png');
  opacity: 0.5;
}

.loading {
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: .8rem;
  letter-spacing: .1rem;
  text-transform: uppercase;
  color: var(--muted-text-color);
  animation-name: loading-glow;
  animation-iteration-count: infinite;
  animation-duration: 400ms;
  animation-fill-mode: both;
  animation-direction: alternate;
}

@keyframes loading-glow {
  from { opacity: 0.5; }
  to { opacity: 1.0; }
}
</style>

<template>
  <video
    class="overlay background-video pos-fixed"
    loop
    muted
    playsinline
    preload="auto"
    :autoplay="autoplay"
    poster="assets/images/apsis_hero_cover.jpg"
    @play="loading = false"
  >
    <source type="video/mp4" :src="props.src" />
    Your browser doesn't support video. =(
  </video>

  <div class="overlay pos-fixed video-overlay-texture" />
  <div class="overlay pos-fixed video-darken-overlay" />

  <span class="loading pos-fixed" v-if="loading">{{ props.loadingText }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: false
  },
  loadingText: {
    type: String,
    required: false,
    default: ''
  }
})

const loading = $ref(true)
</script>
