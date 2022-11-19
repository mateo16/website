<style scoped>
.footer {
  width: 100%;
  padding: var(--content-margin);
  background-color: var(--callout-color);

  top: 100vh;

  display: flex;
  align-items: center;

  transition: transform 200ms ease-out, opacity 200ms linear;
}

.footer-text {
  font-size: .6rem;
  font-weight: 400;
  letter-spacing: 0.04rem;
  line-height: 1.8em;
  color: var(--text-color);
  text-transform: uppercase;
}

.brand-container {
  gap: .7rem;
}

.address-card {
  max-width: 10rem;
}

.locations-container {
  justify-content: center;
  align-items: flex-start;
}

.location-link {
  text-transform: uppercase;
  font-family: var(--heading-font);
  font-weight: 600;
  letter-spacing: 0.04rem;
  cursor: pointer;
  white-space: nowrap;
}
</style>

<template>
  <footer class="footer pos-sticky flex-col flex-center flex-gap">
    <SocialButtonGroup
      :linkedin="appConfig.linkedInUrl"
      :github="appConfig.githubUrl"
      :twitter="appConfig.twitterUrl"
    />

    <Separator margin="0" />

    <div class="locations-container flex-row flex-wrap flex-gap-large selectable">
      <div class="flex-col address-card">
        <span class="location-link flex-row flex-start flex-gap-tiny" @click="navigate(company.locations.us.url)">
          <LocationIcon class="icon-button" />
          {{ copy.company.locations.us }}
        </span>
        <span class="footer-text" v-for="i of company.locations.us.address">{{ i }}</span>
      </div>
      <div class="flex-col address-card">
        <span class="location-link flex-row flex-start flex-gap-tiny" @click="navigate(company.locations.ba.url)">
          <LocationIcon class="icon-button" />
          {{ copy.company.locations.ba }}
        </span>
        <span class="footer-text" v-for="i of company.locations.ba.address">{{ i }}</span>
      </div>
    </div>

    <div class="brand-container flex-row flex-center">
      <Logo no-interaction />
      <Wordmark no-interaction />
    </div>

    <span class="footer-text">{{ copy.company.name }}™ {{ thisYear }}. {{ copy.footer.notice }}</span>
  </footer>
</template>

<script setup lang="ts">
import { getAppConfig } from '@/lib/config'
import { navigate } from '@/lib/utils'
import LocationIcon from 'assets/icons/location.svg?component'
import company from '@/config/company.yml'
import copy from 'assets/copy/en/app.yml'

const appConfig = getAppConfig()
const thisYear = $computed(() => `${new Date().getFullYear()}`)
</script>
