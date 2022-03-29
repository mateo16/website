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

  /* border: 1px solid pink; */
}

.nav-hidden {
  transform: translateY(-100%) scaleX(0)
}

.wordmark {
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: .1rem;
  color: var(--highlighted-text-color);
}

.separator {
  margin: auto;
}

.nav-button {
  font-size: .8rem;
  font-weight: 300;
  letter-spacing: .04rem;
  text-transform: uppercase;
  text-decoration: none;
  margin: 0 .5rem;
}

.nav-backdrop {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  background-color: var(--background-color-callout);
  width: 100%;
  height: 100%;
  transform-origin: center center;
  transition: all 300ms ease-in-out;
}

.nav-backdrop-hidden {
  transform: scaleX(0);
  background-color: var(--text-color);
  border-radius: 5%;
}
</style>

<template>
  <header :class="`nav flex-row non-selectable ${hidden ? 'nav-hidden' : ''}`">
    <div v-if="!noBackground" :class="`nav-backdrop ${hidden ? 'nav-backdrop-hidden' : ''}`" />

    <div style="transform: translateY(.1rem)">
      <Logo animate width="1.4rem" />
    </div>
    <router-link to="/">
      <span class="wordmark" style="text-decoration: none">{{copy.nav.wordmark}}</span>
    </router-link>

    <span class="separator" />

    <router-link class="nav-button" to="/blog">{{copy.nav.blog}}</router-link>
    <router-link class="nav-button" to="/contact">{{copy.nav.contact}}</router-link>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import copy from '@/assets/copy/en/app.yml'

const threshold = 30;
const hidden = ref(false)

const props = defineProps({
  noBackground: {
    type: Boolean,
    default: false,
    required: false
  }
})

const onScroll = () => { hidden.value = window.scrollY > threshold }

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
