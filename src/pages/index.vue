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

.separator {
  display: block;
  width: 100%;
  margin: .5rem auto;
  border-top: 1px solid var(--border-color);
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
}
</style>

<template>
  <h1>{{copy.title}}</h1>
  <p>{{copy.legend}}</p>

  <div
    class="post"
    v-for="post in posts"
    :key="post.path"
  >
    <hr class="separator" />

    <router-link class="post-title" :to="post.path">{{ post.meta.frontmatter.title }}</router-link>
    <span class="caption">{{ getCaption(post.meta.frontmatter) }}</span>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import copy from '@/assets/copy/en/index.yml'

useHead({
  title: `${copy.title} | Apsis`,
  meta: [
    {
      name: copy.legend,
      content: `Description`,
    },
  ],
})

const formatDate = (date: string) => (new Date(date)).toDateString()
const getCaption = (frontmatter: Object) => {
  let s = ''
  if (frontmatter.author) {
    s += ` ${copy.postedBy} ${frontmatter.author}, `
  }
  s += `${formatDate(frontmatter.date)}`
  return s
}

const router = useRouter()

// filter routes to display only posts, sorted by ascending post date
const posts = router.getRoutes()
  .filter((r) => r.name !== undefined && r.path.startsWith('/posts'))
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date),
  )
</script>
