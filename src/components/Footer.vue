<style scoped>
.footer {
  width: 100%;
  padding: var(--content-margin);
  background-color: var(--background-color);

  display: flex;
  align-items: center;

  transition: transform 200ms ease-out, opacity 200ms linear;
}

.footer-text {
  font-size: .6rem;
  font-weight: 300;
  color: var(--text-color);
  text-transform: uppercase;
}

.brand-container {
  gap: .5rem;
}
</style>

<template>
  <footer class="footer pos-relative flex-col flex-center">
    <div class="flex-row flex-center flex-gap">
      <SocialButtonGroup
        :linkedin="appConfig.linkedInUrl"
        :github="appConfig.githubUrl"
        :twitter="appConfig.twitterUrl"
      />
    </div>
    <Separator margin="1rem" />
    <div class="brand-container flex-row flex-center">
      <Logo no-interaction />
      <Wordmark no-interaction />
    </div>

    <span class="footer-text">{{ copy.company }}™ {{ thisYear }}. {{ copy.footer.notice }}</span>
  </footer>
</template>

<script setup lang="ts">
import { getAppConfig } from '@/lib/config'
import copy from 'assets/copy/en/app.yml'

const appConfig = getAppConfig()
const thisYear = $computed(() => `${new Date().getFullYear()}`)
</script>
