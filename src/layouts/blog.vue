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

.content-wrapper {
  padding-top: var(--nav-height);
  padding-right: var(--content-margin);
  padding-left: var(--content-margin);
}
</style>

<template>
  <div class="selectable pos-relative content-wrapper overflow-x-hidden">
    <BlogPostImageDecoration :image-url="bannerImageUrl" />

    <main class="pos-relative content-section">
      <BlogPostHeader
        :title="frontmatter.title"
        :description="frontmatter.description"
        :author="frontmatter.author"
        :date="frontmatter.date"
      />

      <BlogPostTags
        :tags="tags"
        @tag-selected="(tag: string) => { router.push({ path: '/blog', query: { tag } }) }"
        backgrounds
      />

      <Separator />

      <!-- BLOG POST -->
      <router-view />

      <BlogPostFooter />
    </main>

  </div>
  <Nav />
  <Footer />
  <ReadProgress />
  <Notification />
  <DevModeBanner />
</template>

<script lang="ts">
export default {
  name: 'BlogPost'
}
</script>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { getAppConfig } from '@/lib/config'
import { Frontmatter } from '@/types'
import copy from 'assets/copy/en/app.yml'
import company from '@/config/company.yml'

const route = useRoute()
const router = useRouter()
const frontmatter = route.meta.frontmatter as Frontmatter

const appConfig = getAppConfig()
const blogPostTitle = frontmatter.title
const tags = frontmatter.tags
const blogPostBanner = frontmatter.banner
const blogPostDescription = frontmatter.description
const title = `${blogPostTitle} | ${copy.blog.title}`
const url = `${appConfig.appUrl}${route.fullPath}`
const bannerImageUrl = new URL(`/src/pages${route.fullPath}/${blogPostBanner}`, import.meta.url).href

type MetaProperty = { property: string, content: any, key?: any }

const meta: MetaProperty[] = [
  { property: 'og:site_name', content: copy.company.name },
  { property: 'og:title', content: blogPostTitle },
  { property: 'og:locale', content: copy.locale },
  { property: 'og:type', content: 'article' },
  { property: 'og:description', content: blogPostDescription },
  { property: 'og:url', content: url },
  // { property: 'og:image', content: bannerImageUrl },
  { property: 'og:image', content: `${appConfig.appUrl}/img/banner.png` },
  { property: 'og:image:alt', content: 'blog post banner image' },
  { property: 'og:image:type', content: 'image/png' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:description', content: frontmatter.description ? frontmatter.description : copy.blog.title },
  { property: 'article:published_time', content: frontmatter.date },
]

if (tags) {
  meta.push({ property: 'article:section', content: tags[0] })

  for (const tag of tags) {
    meta.push({ property: 'article:tag', content: tag, key: tag })
  }
}

if (frontmatter.author) {
  const authorInfo = company.team[frontmatter.author]
  if (authorInfo) {
    meta.push({ property: 'article:author', content: authorInfo.linkedin })
  }
}

useHead({
  htmlAttrs: { lang: copy.locale },
  title,
  meta
})
</script>
