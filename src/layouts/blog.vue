<template>
  <main>
    <!-- BLOG POST HEADER -->
    <BlogPostHeader
      :title="frontmatter.title"
      :author="frontmatter.author"
      :date="frontmatter.date"
    />
    <Separator />

    <!-- BLOG POST -->
    <router-view />

    <!-- BLOG POST FOOTER -->
    <BlogPostFooter />

  </main>
  <Nav scroll-target="app" />
  <Footer scroll-target="app" />
  <ReadProgress scroll-target="app" />
  <Notification />
</template>

<script lang="ts">
export default {
  name: 'BlogPostLayout'
}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { getAppConfig } from '@/lib/config'
import copy from '@/assets/copy/en/app.yml'

const route = useRoute()
const frontmatter = route.meta.frontmatter as any

const appConfig = getAppConfig()
const blogPostTitle = frontmatter.title
const pageTitle = `${blogPostTitle} | ${copy.blog.title}`
const url = `${appConfig.appUrl}${route.fullPath}`

useHead({
  title: pageTitle,

  meta: [
    // OpenGraph config
    { property: 'og:site_name', content: copy.blog.title },
    { property: 'og:title', content: blogPostTitle },
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
