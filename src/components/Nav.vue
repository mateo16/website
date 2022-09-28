<style scoped>
.nav {
  position: fixed;
  top: 0;
  padding: 0 var(--content-margin);
  align-items: center;
  min-height: var(--nav-height);
  width: 100%;
  transition: transform 400ms ease-out;
}

.nav-hidden {
  transform: translateY(-100%) scaleX(0)
}

.nav-links-container {
  gap: 1.5rem;
  display: flex;
  flex-direction: row;
}

.separator {
  margin: auto;
}

.nav-link {
  font-size: .8rem;
  font-weight: 600;
  letter-spacing: .1rem;
  text-transform: uppercase;
  text-decoration: none;
}

@media (--res-mobile-all){
  .wordmark {
    display: none;
  }
}
</style>

<template>
  <nav :class="`nav flex-row flex-gap ${hidden ? 'nav-hidden' : ''}`">
    <div class="logo-container flex-row flex-center flex-gap">
      <Logo @click="router.push('/')" animation-class="grow-and-spin" />
      <span class="link wordmark hide-wordmark" @click="router.push('/')">{{copy.companyShort}}</span>
    </div>

    <span class="separator" />

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
