<template>
  <h1>{{copy.title}}</h1>

  <div v-for="item in routes" :key="item.path" class="mb-4">
    <router-link
      class="text-lg"
      :to="{
        path: `${item.path}`,
      }"
    >
      {{item.path}}
      <!-- <span class="blog-title">{{ item.meta.frontmatter.title }}</span> -->
    </router-link>
    <!-- <div class="text-gray-400 mt-2 text-sm">
      {{ item.meta.frontmatter.date }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import copy from '@/assets/copy/en/toc.yml'

useHead({
  title: 'Table of Contents',
  meta: [
    {
      name: `description`,
      content: `Website description`,
    },
  ],
})

const router = useRouter()
const routes = router.getRoutes()
// console.debug(routes)
// debugger
// routes.forEach((r) => { console.debug(r.path) })
// routes.forEach((r, i) => { console.debug(r, i) })

// const posts = computed(() => routes.filter(i => i))

</script>
