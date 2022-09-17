<style scoped>
.post {
  margin-bottom: 1.5rem;
  background-color: var(--background-color-callout);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.4);
  transition: all 150ms ease-out;
}

@media (--hover) {
  .post:hover {
    scale: 1.02;
    background-color: var(--border-color);
    color: var(--highlighted-text-color);
    cursor: pointer;
  }
}

.post-title {
  font-family: var(--primary-font);
  display: inline-block;
  font-size: 1rem;
  letter-spacing: 0.04rem;
  text-transform: uppercase;
  margin-bottom: .3rem;
  padding-bottom: .2rem;
  line-height: 1.4rem;
}
</style>

<template>
  <h1 class="gradient-text">{{ copy.blog.title }}</h1>
  <h4>{{ copy.blog.subtitle }}</h4>

  <Separator />

  <div
    class="post"
    v-for="post in posts"
    :key="post.path"
    @click="router.push(post.path)"
  >
    <span class="post-title gradient-text">{{ post.meta.frontmatter.title }}</span>

    <BlogPostHeader
      :author="post.meta.frontmatter.author"
      :date="post.meta.frontmatter.date"
      :social-links="false"
      photo-size="2.4rem"
    />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import copy from 'assets/copy/en/app.yml'

useHead({ title: `${copy.blog.title}` })

const router = useRouter()

const posts = router.getRoutes()
  .filter((r) => r.name !== undefined && r.path.startsWith('/blog/'))
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date),
  )
</script>
