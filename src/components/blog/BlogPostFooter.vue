<style scoped>
.container {
  background-color: var(--callout-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: var(--content-margin) 0;
  border-radius: var(--border-radius);

  text-align: center;
  font-size: .9rem;
}
</style>

<template>
  <div class="container non-selectable">
    <BlogPostCTA />
    <Button :text="copy.blog.footer.cta" @click="router.push({path: '/', hash: '#contact'})" />
  </div>
</template>

<script setup lang="ts">
import BlogPostCTA from 'assets/copy/en/blogpost-cta.md'
import copy from 'assets/copy/en/app.yml'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
