<style scoped>
.nav {
  position: fixed;
  top: 0;
  padding: 0 var(--content-margin);
  gap: 1rem;
  align-items: center;
  min-height: var(--nav-height);
  width: 100%;
  transition: transform 400ms ease-out;
  pointer-events: none;
}

.nav-hidden {
  transform: translateY(-100%) scaleX(0)
}

.separator {
  margin: auto;
}

.nav-link {
  pointer-events: all;
  font-size: .8rem;
  letter-spacing: .08rem;
  text-transform: uppercase;
  text-decoration: none;
  margin: 0 .2rem;
}

.wordmark {
  font-weight: 800;
  letter-spacing: .2rem;
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
  <nav :class="`nav flex-row non-selectable ${hidden ? 'nav-hidden' : ''}`">
    <div v-if="props.showBackground" :class="`nav-backdrop ${hidden ? 'nav-backdrop-hidden' : ''}`" />

    <!--  LOGO -->
    <!-- adjust logo a bit... -->
    <div style="transform: translateY(.1rem)">
      <Logo
        color="var(--highlighted-text-color)"
        width="1.4rem"
      />
    </div>

    <!--  WORDMARK -->
    <router-link class="nav-link wordmark" to="/">{{copy.company}}</router-link>

    <span class="separator" />

    <!--  NAV LINKS -->
    <router-link class="nav-link" to="/blog">{{copy.nav.blog}}</router-link>
    <router-link class="nav-link" to="/contact">{{copy.nav.contact}}</router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useScroll from '@/lib/composable/scroll'
import { getElement } from '@/lib/element'
import copy from '@/assets/copy/en/app.yml'

const props = defineProps({
  showBackground: {
    type: Boolean,
    default: false,
    required: false
  },
  scrollTarget: {
    type: String,
    required: true
  },
  threshold: {
    type: Number,
    required: false,
    default: 30
  }
})

const element = getElement(props.scrollTarget)
const { scrollY } = useScroll(element)
const hidden = computed(() => scrollY.value > props.threshold)
</script>
