<style scoped>
.post {
  margin-bottom: 1.5rem;
}

.post-title {
  font-family: var(--primary-font);
  display: inline-block;
  font-size: 1rem;
  letter-spacing: 0.04rem;
  text-transform: uppercase;
  margin-bottom: .3rem;
  padding-bottom: .2rem;
  line-height: 1.6rem;
}
</style>

<template>
  <h1>{{ copy.blog.title }}</h1>
  <h4>{{ copy.blog.subtitle }}</h4>

  <div
    class="post"
    v-for="post in posts"
    :key="post.path"
  >
    <Separator />

    <router-link
      class="post-title"
      style="font-weight: 400"
      :to="post.path"
    >
      {{ post.meta.frontmatter.title }}
    </router-link>

    <PostInfoHeader
      :author="post.meta.frontmatter.author"
      :date="post.meta.frontmatter.date"
      photo-size="1.6rem"
    />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import copy from '@/assets/copy/en/app.yml'

useHead({
  title: `${copy.blog.title}`
})

const router = useRouter()

const posts = router.getRoutes()
  .filter((r) => r.name !== undefined && r.path.startsWith('/blog/'))
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date),
  )
</script>
