<style scoped>
.nav {
  position: fixed;
  display: flex;
  flex-direction: row;
  top: 0;
  padding: .5rem var(--content-margin);
  gap: .5rem;
  align-items: center;
  min-height: var(--nav-height);
  width: 100%;
  transition: transform 600ms ease-out;
  /* border: 1px solid cyan; */
}

.separator {
  margin: auto;
}

.nav-button {
  font-size: .9rem;
  text-transform: uppercase;
  margin: 0 .5rem;
}

.divider {
  position: fixed;
  top: var(--nav-height);
  display: flex;
  border-bottom: .12rem solid var(--border-color);
  width: 100%;
  transform-origin: center center;
  transition: transform 300ms ease, border 300ms ease;
}

.hidden {
  transform: scaleX(0);
  border-bottom: 1rem solid var(--accent-color);
}
.hidden-nav {
  transform: translateY(-100%)
}
</style>

<template>
  <header :class="`nav ${hidden ? 'hidden-nav' : ''}`">
  <!-- <header :class="`nav ${scrollPos > threshold ? 'hidden-nav' : ''}`"> -->
    <router-link to="/">
      <Logo width="2rem" />
    </router-link>

    <span>{{copy.title}}</span>

    <span class="separator" />

    <router-link class="nav-button" to="/">{{copy.blog}}</router-link>
    <router-link class="nav-button" to="">{{copy.contact}}</router-link>
  </header>
  <div :class="`divider ${hidden ? 'hidden' : ''}`" />
  <!-- <div :class="`divider ${scrollPos > threshold ? 'hidden' : ''}`" /> -->
</template>

<script lang="ts">
export default {
  name: 'Nav'
}
</script>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import copy from '@/assets/copy/en/nav.yml'

const threshold = 30;
const hidden = ref(false)

const onScroll = () => { hidden.value = window.scrollY > threshold }

onMounted(() => { window.addEventListener('scroll', onScroll) })

onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll) })

</script>
