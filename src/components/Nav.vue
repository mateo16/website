<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  padding: .5rem var(--content-margin);
  gap: .5rem;
  align-items: center;
  min-height: var(--nav-height);
  width: 100vw;

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
    <router-link class="nav-button" to="/">
      <Logo width="2rem" />
    </router-link>

    <span>{{copy.title}}</span>

    <span class="separator" />

    <router-link class="nav-button" to="/">{{copy.blog}}</router-link>
    <router-link class="nav-button" to="/">{{copy.contact}}</router-link>
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
