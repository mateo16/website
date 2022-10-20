<style>
/* Markdown-embedded images */
.markdown-body > p > img {
  display: flex;
  max-width: 70%;
  height: auto;
  margin: 0 auto;
}
</style>

<template>
  <PostDecoration />
  <main class="selectable">
    <BlogPostHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      :author="frontmatter.author"
      :date="frontmatter.date"
    />
    <Separator />

    <!-- BLOG POST -->
    <router-view />

    <BlogPostFooter />
  </main>
  <Nav />
  <Footer />
  <ReadProgress />
  <Notification />
  <DevModeBanner />
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
import copy from 'assets/copy/en/app.yml'

const route = useRoute()
const frontmatter = route.meta.frontmatter as any

const appConfig = getAppConfig()
const blogPostTitle = frontmatter.title
const blogPostDescription = frontmatter.description
const pageTitle = `${blogPostTitle} | ${copy.blog.title}`
const url = `${appConfig.appUrl}${route.fullPath}`

useHead({
  title: pageTitle,

  meta: [
    // OpenGraph config
    { property: 'og:site_name', content: copy.blog.title },
    { property: 'og:title', content: blogPostTitle },
    { property: 'og:description', content: blogPostDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: `${appConfig.appUrl}/img/banner.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:description', content: frontmatter.description ? frontmatter.description : copy.blog.title },
    { property: 'og:locale', content: 'en_US' },
  ],
})
</script>
