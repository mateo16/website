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

.separator {
  margin: auto;
}

.nav-link {
  font-size: .8rem;
  letter-spacing: .08rem;
  text-transform: uppercase;
  text-decoration: none;
}
</style>

<template>
  <nav :class="`nav flex-row flex-gap ${hidden ? 'nav-hidden' : ''}`">
    <Logo @click="router.push('/')" />
    <span class="link wordmark" @click="router.push('/')">{{copy.companyShort}}</span>

    <span class="separator" />

    <!--  NAV LINKS -->
    <span class="link nav-link" @click="router.push('/blog')">{{copy.nav.blog}}</span>
    <span class="link nav-link" @click="router.push({path: '/', hash: '#contact'})">{{copy.nav.contact}}</span>

    <SocialButtonGroup
      :linkedin="appConfig.linkedInUrl"
      :github="appConfig.githubUrl"
    />
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
