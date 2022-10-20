<style scoped>
.post {
  margin-bottom: 1.5rem;
  background-color: var(--callout-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--card-shadow);
  transition: all 150ms ease-out;
}

@media (--hover) {
  .post:hover {
    scale: 1.02;
    background-color: var(--highlighted-callout-color);
    cursor: pointer;
  }
}
</style>

<template>
  <h1 class="color-text">{{ copy.blog.title }}</h1>
  <h4>{{ copy.blog.subtitle }}</h4>

  <Separator />

  <div
    class="post"
    v-for="post in posts"
    :key="post.path"
    @click="router.push(post.path)"
  >
    <h3 class="color-text">{{ (post.meta.frontmatter as Frontmatter).title }}</h3>

    <BlogPostHeader
      :author="(post.meta.frontmatter as Frontmatter).author"
      :date="(post.meta.frontmatter as Frontmatter).date"
      :social-links="false"
      photo-size="2.4rem"
    />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import copy from 'assets/copy/en/app.yml'
import { Frontmatter } from '@/types'

useHead({ title: `${copy.blog.title}` })

const router = useRouter()

const posts = router.getRoutes()
  .filter((r) => r.name !== undefined && r.path.startsWith('/blog/'))
  .sort(
    // @ts-ignore
    (a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date),
  )
</script>
