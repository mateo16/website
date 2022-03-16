<style scoped>
.container {
  position: absolute;
  width: 100%;
  max-height: 100vh;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.under-construction {
  text-align: center;
}
</style>

<template>
  <div class="container">
    <Logo width="6rem" />
    <h4 style="margin: 2rem 0">{{copy.home.underConstruction.title}}</h4>
    <span class="under-construction" v-html="copy.home.underConstruction.text"></span>
  </div>
</template>

<script setup lang="ts">
import copy from '@/assets/copy/en/app.yml'
</script>
