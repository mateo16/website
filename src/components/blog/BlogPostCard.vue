`<style scoped>
.post-card {
  margin-bottom: 1.5rem;
  background-color: var(--callout-color);
  border-radius: 2rem var(--border-radius) 2rem var(--border-radius);
  overflow: hidden;
  padding: 1rem;
  box-shadow: var(--card-shadow);
  transition: all 150ms ease-out;
  min-height: 10rem;
}

.post-card-image {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  opacity: 0.3;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.post-card-description {
  font-size: 0.9rem;
  font-weight: 450;
  line-height: 1.2rem;
}

.post-card-date {
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.04rem;
  color: var(--text-color);
  margin-top: .5rem;
}

@media (--hover) {
  .post-card:hover {
    scale: 1.02;
    background-color: var(--highlighted-callout-color);
    cursor: pointer;
  }
}
</style>

<template>
  <div
    class="post-card pos-relative"
    @click="router.push(path)"
  >
    <div
      class="post-card-image pos-absolute"
      :style="`background-image: url(${bannerImageUrl()})`"
    />

    <div class="pos-relative flex-col">
      <BlogPostTags :tags="tags" @tag-selected="(tag: string) => emit('tag-selected', tag)" />

      <h2 class="text-shadow">{{ title }}</h2>
      <span class="post-card-description">{{ description }}</span>
      <span class="post-card-date">{{ formatDate(date) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatDate } from '@/lib/utils'

const emit = defineEmits(['tag-selected'])

const router = useRouter()

const {
  path,
  title = '',
  banner = '',
  description = '',
  date = '',
  tags = [],
} = defineProps<{
  path: string
  title: string
  banner: string
  description: string
  date: string
  tags: string[]
}>()

const bannerImageUrl = () => {
  const url = new URL(`/src/pages${path}/${banner}`, import.meta.url)
  return url.href
}
</script>
