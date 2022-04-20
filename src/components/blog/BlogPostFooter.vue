<style scoped>
.container {
  background-color: var(--background-color-callout);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-top: 3rem;
  margin-bottom: 1rem;

  text-align: center;
  font-size: .9rem;
}
</style>

<template>
  <div class="container">
    <BlogPostCTA />
    <Button :text="copy.blog.footer.cta" to="/contact" />
  </div>
</template>

<script setup lang="ts">
import BlogPostCTA from '@/assets/copy/en/blogpost-cta.md'
import copy from '@/assets/copy/en/app.yml'
</script>
