<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  padding: .5rem var(--content-margin);
  gap: .5rem;
  align-items: center;

  /* border: 1px solid cyan; */
}

.separator {
  margin: auto;
}

.nav-button {
  text-transform: uppercase;
  margin: 0 1rem;
}
</style>

<template>
  <header class="nav">
    <Logo width="2rem" />
    <span>{{copy.title}}</span>
    <span class="separator" />
    <router-link class="nav-button" to="/faq">faq</router-link>
    <router-link class="nav-button" to="/">home</router-link>
  </header>
</template>

<script lang="ts">
export default {
  name: 'Nav'
}
</script>


<script setup lang="ts">
import copy from '@/assets/copy/en/nav.yml'
</script>
