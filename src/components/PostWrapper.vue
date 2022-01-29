<template>
  <h1>
    {{ frontmatter.title }}
  </h1>
  <slot />
</template>

<script setup lang="ts">
const { frontmatter } = defineProps<{ frontmatter: any }>()

</script>
