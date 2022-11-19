<style scoped>
.nav {
  position: fixed;
  top: 0;
  padding: 0 var(--content-margin);
  align-items: center;
  justify-content: space-between;
  min-height: var(--nav-height);
  width: 100%;
  transition: transform 300ms ease-out, background 300ms ease-out;
}

.nav-background {
  background: var(--callout-color);
}

.nav-hidden {
  transform: translateY(-100%) scaleX(0)
}

.brand-container {
  gap: .7rem;
}

.nav-links-container {
  gap: .5rem;
  display: flex;
  flex-direction: row;
}

.nav-link {
  font-size: .8rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: .06rem;
  text-transform: uppercase;
  text-decoration: none;

  padding: .2rem .4rem;
  border-radius: var(--border-radius);
}

.navigation-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
}

@media (--res-narrow) {
  .navigation-container {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
  }

  /* HACK: slight correction so that nav links and social buttons are aligned */
  .nav-links-container {
    transform: translateY(.4rem);
  }

  .buttons-container {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1rem;
  }
}

.active-nav-link {
  background: var(--highlighted-callout-color);
  pointer-events: none;
}
</style>

<template>
  <nav
    class="nav flex-row flex-gap"
    :class="{
      'nav-hidden': hidden && !noHide,
      'nav-background': hidden && noHide
    }"
  >
    <div class="navigation-container">
      <div class="brand-container flex-row flex-center">
        <Logo @click="router.push('/')" animation-class="grow-and-spin" />
        <Wordmark @click="router.push('/')" />
      </div>

      <div class="nav-links-container flex-center">
        <span
          v-for="item of navLinks"
          class="link nav-link"
          :class="{ 'active-nav-link': router.currentRoute.value.fullPath === item.route }"
          @click="router.push(item.route)"
        >
          {{ item.text }}
        </span>
      </div>

    </div>

    <div class="buttons-container">
      <Button
        small
        :text="copy.nav.contact"
        @click="router.push({ path: '/', hash: '#contact' })"
      />

      <SocialButtonGroup
        :linkedin="appConfig.linkedInUrl"
        :github="appConfig.githubUrl"
        :twitter="appConfig.twitterUrl"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useWindowScrollPos } from '@/lib/composable/scroll'
import { useRouter } from 'vue-router'
import { getAppConfig } from '@/lib/config'
import copy from 'assets/copy/en/app.yml'

const navLinks = [
  { route: '/team',  text: copy.nav.team },
  { route: '/blog',  text: copy.nav.blog },
]

const props = defineProps({
  threshold: {
    type: Number,
    required: false,
    default: 30
  },
  noHide: {
    type: Boolean,
    required: false,
    default: false
  }
})

const appConfig = getAppConfig()
const router = useRouter()
const { scrollY } = $(useWindowScrollPos())

const hidden = $computed(() => scrollY > props.threshold)
</script>
