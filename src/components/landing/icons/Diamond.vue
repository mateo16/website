<style scoped>
.container {
  display: block;
  width: 7rem;
  height: 7rem;
}

.diamond {
  width: 70%;
  top: 15%;
  left: 15%;
}

.spark {
  transform-origin: center center;
  animation-name: spinCW;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
}

.spark1 {
  width: 30%;
  top: 25%;
  left: 3%;
}

.spark2 {
  width: 50%;
  top: -2%;
  left: 43%;
  animation-delay: .4s;
}

.spark3 {
  width: 40%;
  top: 40%;
  left: 45%;
  animation-delay: 1s;
}


@keyframes spinCW {
  50% {
    scale: 0;
    opacity: 0;
  }
  100% {
    rotate: -.5turn;
  }
}
</style>

<template>
  <div class="pos-relative container">
    <DiamondIcon class="pos-absolute diamond" />
    <SparkleIcon class="pos-absolute spark spark1" />
    <SparkleIcon class="pos-absolute spark spark2" />
    <SparkleIcon class="pos-absolute spark spark3" />
  </div>
</template>

<script setup lang="ts">
import DiamondIcon from 'assets/icons/diamond.svg?component'
import SparkleIcon from 'assets/icons/sparkle.svg?component'
</script>
