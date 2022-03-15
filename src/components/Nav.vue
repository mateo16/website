<style scoped>
.nav {
  position: fixed;
  top: 0;
  padding: .5rem var(--content-margin);
  gap: .5rem;
  align-items: center;
  min-height: var(--nav-height);
  width: 100%;
  transition: transform 400ms ease-out;
  /* outline: 1px solid yellow; */
}

.wordmark {
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: .06rem;
  color: var(--text-color-highlight);
}

.nav-hidden {
  transform: translateY(-100%)
}

.separator {
  margin: auto;
}

.nav-button {
  font-size: .9rem;
  text-transform: uppercase;
  text-decoration: none;
  margin: 0 .5rem;
}

.divider {
  position: fixed;
  top: var(--nav-height);
  display: flex;
  background-color: var(--border-color);
  width: 100%;
  height: var(--decoration-line-thickness);
  transform-origin: center center;
  transition: all 300ms ease-in-out;
}

.divider-hidden {
  transform: scale(0, 10);
  background-color: var(--accent-color);
  border-radius: 20%;
}
</style>

<template>
  <header :class="`nav non-selectable flex-row ${hidden ? 'nav-hidden' : ''}`">
    <Logo width="2rem" />

    <router-link to="/"><span class="wordmark" style="text-decoration: none">{{copy.nav.title}}</span></router-link>

    <span class="separator" />

    <router-link class="nav-button" to="/blog">{{copy.nav.blog}}</router-link>
    <router-link class="nav-button" to="">{{copy.nav.contact}}</router-link>
  </header>
  <div :class="`divider ${hidden ? 'divider-hidden' : ''}`" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import copy from '@/assets/copy/en/app.yml'

const threshold = 30;
const hidden = ref(false)

const onScroll = () => { hidden.value = window.scrollY > threshold }

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

</script>
