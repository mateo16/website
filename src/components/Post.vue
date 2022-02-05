<style>
.banner {
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  border: 1px solid yellow;
}

.post-subtitle {
  font-size: 1.3rem;
  /* line-height: 4rem; */
  padding-bottom: 3rem;
}
</style>

<template>
  <h1 >{{ frontmatter.title }}</h1>
  <h2>{{ subtitle }}</h2>
  <Separator />
  <slot />
  <!-- <img class="banner" v-if="frontmatter.banner" :src="`@./${frontmatter.banner}`" /> -->
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { formatPostSubtitle } from '@/lib/utils'
import copy from '@/assets/copy/en/post.yml'

const { frontmatter } = defineProps<{ frontmatter: any }>()

const title = `${frontmatter.title} | ${copy.title}`
const url = `${import.meta.env.APSIS_WEBSITE_URL}${useRoute().fullPath}`

const subtitle = computed(() => formatPostSubtitle(frontmatter) )

useHead({
  title,
  // OpenGraph config
  meta: [
    { property: 'og:site_name', content: copy.title },
    { property: 'og:title', content: title },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: `${import.meta.env.APSIS_WEBSITE_URL}/img/apsis.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '800' },
    { property: 'og:image:height', content: '800' },
    { property: 'og:description', content: frontmatter.description ? frontmatter.description : copy.title },
    { property: 'og:locale', content: 'en_US' },
  ],
})
</script>
