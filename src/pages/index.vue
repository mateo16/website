<style scoped>
.caption {
  display: block;
  font-size: .75rem;
  text-transform: capitalize;
}

.post {
  margin-bottom: 1.5rem;
}

.post-title {
  font-size: 1.2rem;
}
</style>

<template>
  <h1>{{copy.title}}</h1>
  <h4>{{copy.legend}}</h4>

  <div
    class="post"
    v-for="post in posts"
    :key="post.path"
  >
    <Separator />

    <router-link class="post-title" :to="post.path">{{ post.meta.frontmatter.title }}</router-link>
    <span class="caption">{{ formatPostSubtitle(post.meta.frontmatter) }}</span>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import copy from '@/assets/copy/en/index.yml'
import { formatPostSubtitle } from '@/lib/utils'
import Separator from '@/components/Separator.vue';

useHead({
  title: `${copy.title}`
})

const router = useRouter()

// filter routes to display only posts, sorted by ascending post date
const posts = router.getRoutes()
  .filter((r) => r.name !== undefined && r.path.startsWith('/posts'))
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date),
  )
</script>
