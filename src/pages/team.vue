<style scoped>
.graphism {
  height: 100%;
  top: 0;
  left: 0;
  color: var(--callout-color);
}
</style>

<template>
  <Circuits class="graphism pos-absolute" />

  <div class="content pos-relative">
    <h1 class="text-center">{{ copy.team.title }}</h1>
    <p class="text-center" v-for="p of copy.team.description">{{ p }}</p>
  </div>

  <div class="flex-row flex-wrap flex-center flex-gap">
    <TeamCard
      v-for="person of team"
      :photoUrl="person.photoUrl"
      :name="person.name"
      :title="person.title"
      :linkedinUrl="person.linkedin"
      :twitterUrl="person.twitter"
    />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { getAppConfig } from '@/lib/config'
import copy from 'assets/copy/en/app.yml'
import company from '@/config/company.yml'
import Circuits from 'assets/icons/circuits.svg?component'

const team = [
  company.team.Martin,
  company.team.Matias,
  company.team.Paz,
  company.team.Clara,
  company.team.Tom,
]

const config = getAppConfig()

useHead({
  htmlAttrs: { lang: copy.locale },
  title: `${copy.company.name} | ${copy.team.title}`,
  meta: [
    { property: 'og:locale', content: copy.locale },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: config.appUrl },
    { property: 'og:site_name', content: copy.company.name },
    { property: 'og:title', content: copy.company.name },
    { property: 'og:description', content: copy.company.tagline },
    { property: 'og:image', content: `${config.appUrl}/img/banner.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
  ]
})
</script>
