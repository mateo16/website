<style scoped>
.hexagon {
  position: absolute;
  fill: hsl(0deg 0% 100% / 10%);

  animation: fall;
  animation-fill-mode: backwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  user-select: none;
}

@keyframes fall {
  0% {
    top: -5%;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 90%;
  }
}
</style>

<template>
  <Hexagon
    v-for="_ in hexagonCount"
    class="hexagon"
    :style="hexagonStyle()"
  />
</template>

<script setup lang="ts">
import Hexagon from 'assets/icons/hexagon.svg?component'
import { randomInt, randomNumber } from '@/lib/utils'

const hexagonCount = 12

const hexagonStyle = () => `left: ${randomInt(10, 90)}%;` +
                           `height: ${randomInt(2, 8)}rem;` +
                           `animation-duration: ${randomInt(10, 30)}s;` +
                           `animation-delay: ${randomInt(-80, 0)}s;` +
                           `opacity: ${randomNumber(0.1, 1)};`
</script>
