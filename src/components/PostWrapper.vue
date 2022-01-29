<template>
  <!-- <img v-if="frontmatter.banner" :src="frontmatter.banner" /> -->

  <h1>{{ frontmatter.title }}</h1>
  <slot />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: `| Apsis`,
  meta: [
    {
      name: 'Name',
      content: `Description`,
    },
  ],
})

const { frontmatter } = defineProps<{ frontmatter: any }>()
</script>
