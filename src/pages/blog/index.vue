<template>
  <h1>{{ copy.blog.title }}</h1>
  <h4>{{ copy.blog.subtitle }}</h4>

  <BlogPostTags
    :tags="tags"
    @tag-selected="onTagSelected"
    :active-tag="activeTag"
    backgrounds
  />

  <Separator />

  <div class="flex-col">
    <BlogPostCard
      v-for="post in posts"
      :key="post.path"
      :path="post.path"
      :tags="post.tags"
      :title="post.title"
      :banner="post.banner"
      :description="post.description"
      :date="post.date"
      @tag-selected="onTagSelected"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BlogView'
}
</script>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import { getAppConfig } from '@/lib/config'
import { onMounted } from 'vue'
import copy from 'assets/copy/en/app.yml'
import blogMap from '@/config/blogMap.json'

const config = getAppConfig()
const router = useRouter()

const title = `${copy.blog.title} | ${copy.company.name}`
const url = config.appUrl + router.currentRoute.value.fullPath

useHead({
  htmlAttrs: { lang: copy.locale },
  title,
  meta: [
    { property: 'og:locale', content: copy.locale },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: copy.company.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: copy.blog.subtitle },
    { property: 'og:image', content: `${config.appUrl}/img/banner.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
  ]
})

const tags = Object.keys(blogMap)

let activeTag = $ref('all')

// @ts-ignore
const posts = $computed(() => blogMap[activeTag])

const onTagSelected = (tag: string) => {
  router.push({ path: '/blog', query: { tag } })
  activeTag = tag
}

onMounted(() => {
  if ('tag' in router.currentRoute.value.query) {
    const tag = router.currentRoute.value.query.tag as string
    if (tag && tag in blogMap) {
      activeTag = tag
    } else {
      // clear query params
      router.push({ path: router.currentRoute.value.path })
    }
  }
})
</script>
