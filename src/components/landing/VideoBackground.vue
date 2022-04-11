<style scoped>
.overlay {
  position: absolute;
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
  opacity: 0.7;
}

.video-overlay-texture {
  background-image: url('@/assets/images/dot-matrix.png');
  opacity: 0.2;
}
</style>

<template>
  <video
    class="overlay background-video"
    loop
    muted
    playsinline
    preload="auto"
    :autoplay="autoplay"
    poster="@/assets/images/apsis_hero_cover.jpg"
    @play="emit('playback-started')"
  >
    <source type="video/mp4" :src="props.src" />
    Your browser doesn't support video. =(
  </video>

  <div class="overlay video-overlay-texture" />
  <div class="overlay video-darken-overlay" />
</template>

<script setup lang="ts">

const emit = defineEmits(['playback-started'])

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
