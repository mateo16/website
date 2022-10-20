<style scoped>
.nav {
  position: fixed;
  top: 0;
  padding: 0 var(--content-margin);
  align-items: center;
  justify-content: space-between;
  min-height: var(--nav-height);
  width: 100%;
  transition: transform 400ms ease-out;
}

.nav-hidden {
  transform: translateY(-100%) scaleX(0)
}

.brand-container {
  gap: .5rem;
}

.nav-links-container {
  gap: 1.5rem;
  display: flex;
  flex-direction: row;
}

.nav-link {
  font-size: .8rem;
  font-weight: 450;
  line-height: 1rem;
  letter-spacing: .08rem;
  text-transform: uppercase;
  text-decoration: none;
}

/* FIXME: temporary, redesign nav */
@media (--res-mobile-all) {
  .wordmark {
    display: none;
  }
}
</style>

<template>
  <nav
    class="nav flex-row flex-gap"
    :class="{ 'nav-hidden': hidden }"
  >
    <div class="brand-container flex-row flex-center">
      <Logo @click="router.push('/')" animation-class="grow-and-spin" />
      <Wordmark @click="router.push('/')" />
    </div>

    <!--  NAV LINKS -->
    <div class="nav-links-container flex-center">
      <span class="link nav-link" @click="router.push('/blog')">{{ copy.nav.blog }}</span>
      <span class="link nav-link" @click="router.push({ path: '/', hash: '#contact' })">{{copy.nav.contact}}</span>

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

const props = defineProps({
  threshold: {
    type: Number,
    required: false,
    default: 30
  }
})

const appConfig = getAppConfig()
const router = useRouter()
const { scrollY } = $(useWindowScrollPos())

const hidden = $computed(() => scrollY > props.threshold)
</script>
