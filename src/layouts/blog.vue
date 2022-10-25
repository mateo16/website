<style>
/* Markdown-embedded images */
.markdown-body > p > img,
.markdown-body > blockquote > p > img {
  display: flex;
  max-width: 80%;
  max-height: 20rem;
  width: auto;
  height: auto;
  margin: 0 auto;
}
</style>

<template>
  <BlogPostImageDecoration :image-url="bannerImageUrl()" />

  <main class="selectable">
    <BlogPostHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      :author="frontmatter.author"
      :date="frontmatter.date"
    />

    <BlogPostTags
      :tags="frontmatter.tags"
      @tag-selected="(tag: string) => { router.push({ path: '/blog', query: { tag } }) }"
      backgrounds
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
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { getAppConfig } from '@/lib/config'
import { Frontmatter } from '@/types'
import copy from 'assets/copy/en/app.yml'

const route = useRoute()
const router = useRouter()
const frontmatter = route.meta.frontmatter as Frontmatter

const appConfig = getAppConfig()
const blogPostTitle = frontmatter.title
const blogPostBanner = frontmatter.banner
const blogPostDescription = frontmatter.description
const pageTitle = `${blogPostTitle} | ${copy.blog.title}`
const url = `${appConfig.appUrl}${route.fullPath}`

useHead({
  htmlAttrs: { lang: copy.locale },
  title: pageTitle,
  meta: [
    { property: 'og:site_name', content: copy.blog.title },
    { property: 'og:title', content: blogPostTitle },
    { property: 'og:locale', content: copy.locale },
    { property: 'og:description', content: blogPostDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: `${appConfig.appUrl}/img/banner.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:description', content: frontmatter.description ? frontmatter.description : copy.blog.title },
  ],
})

const bannerImageUrl = () => {
  const url = new URL(`/src/pages${route.fullPath}/${blogPostBanner}`, import.meta.url)
  return url.href
}
</script>
