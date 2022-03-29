<template>
  <div class="selectable">
    <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
    <PostInfoHeader
      :author="frontmatter.author"
      :date="frontmatter.date"
    />
    <Separator v-if="frontmatter.title" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { getAppConfig } from '@/lib/config'
import copy from '@/assets/copy/en/app.yml'

const { frontmatter } = defineProps<{ frontmatter: any }>()

const appConfig = getAppConfig()
const title = `${frontmatter.title} | ${copy.blog.title}`
const url = `${appConfig.appUrl}${useRoute().fullPath}`

useHead({
  title,
  // OpenGraph config
  meta: [
    { property: 'og:site_name', content: copy.blog.title },
    { property: 'og:title', content: title },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: `${appConfig.appUrl}/img/apsis.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '800' },
    { property: 'og:image:height', content: '800' },
    { property: 'og:description', content: frontmatter.description ? frontmatter.description : copy.blog.title },
    { property: 'og:locale', content: 'en_US' },
  ],
})
</script>
