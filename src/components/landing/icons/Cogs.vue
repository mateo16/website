<style scoped>
.container {
  display: block;
  width: 7rem;
  height: 7rem;

  /* border: 1px solid cyan; */
}

.cog {
  transform-origin: center center;
  animation-iteration-count: infinite;
  animation-duration: 4s;
  animation-timing-function: linear;
}

.rotate-cw {
  animation-name: rotateCW;
}

.rotate-ccw {
  animation-name: rotateCCW;
}

.cog1 {
  width: 60%;
  top: 16%;
  left: 5%;
}

.cog2 {
  width: 40%;
  top: 0%;
  left: 53%;
}

.cog3 {
  width: 30%;
  top: 55%;
  left: 55%;
}

@keyframes rotateCW {
  to { transform: rotate(1turn); }
}

@keyframes rotateCCW {
  to { transform: rotate(-1turn); }
}
</style>

<template>
  <div class="pos-relative container">
    <CogIcon class="pos-absolute cog cog1 rotate-ccw" />
    <CogIcon class="pos-absolute cog cog2 rotate-cw" />
    <CogIcon class="pos-absolute cog cog3 rotate-cw" />
  </div>
</template>

<script setup lang="ts">
import CogIcon from 'assets/icons/cog.svg?component'
</script>
