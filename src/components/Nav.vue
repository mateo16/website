<style scoped>
.nav {
  position: fixed;
  top: 0;
  padding: 0 var(--content-margin);
  gap: .5rem;
  align-items: center;
  min-height: var(--nav-height);
  width: 100%;
  transition: transform 400ms ease-out;
}

.nav-hidden {
  transform: translateY(-100%) scaleX(0)
}

.separator {
  margin: auto;
}

.nav-link {
  font-size: .8rem;
  letter-spacing: .04rem;
  text-transform: uppercase;
  text-decoration: none;
  margin: 0 .2rem;
}

.wordmark {
  font-weight: 700;
  letter-spacing: .12rem;
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
        @click="router.push('/')"
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
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import copy from '@/assets/copy/en/app.yml'

const router = useRouter()
const threshold = 30;
const hidden = ref(false)

const props = defineProps({
  showBackground: {
    type: Boolean,
    default: false,
    required: false
  },
  scrollTarget: {
    type: String,
    default: null,
    required: false
  }
})

const onScroll = () => {
  const scrollPos = targetElement ? targetElement.scrollTop : window.scrollY
  hidden.value = scrollPos > threshold
}

let targetElement: HTMLElement | null

onMounted(() => {
  if (props.scrollTarget) {
    targetElement = document.getElementById(props.scrollTarget)
    if (!targetElement) {
      console.error(`Element with id "${props.scrollTarget}" not found`)
      throw new Error(`Element with id "${props.scrollTarget}" not found`)
    }
    targetElement.addEventListener('scroll', onScroll)
  } else {
    window.addEventListener('scroll', onScroll)
  }
})

onBeforeUnmount(() => {
  if (targetElement) {
    targetElement.removeEventListener('scroll', onScroll)
  } else {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>
