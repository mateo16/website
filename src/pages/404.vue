<template>
  <div class="pos-relative flex-col flex-center">
    <h2 class="text-center">{{ copy.error.notFound.title }}</h2>
    <p class="text-center" style="margin-bottom: 2rem">{{ copy.error.notFound.caption }}</p>

    <Button :text="copy.error.notFound.home" to="/" />
  </div>
</template>

<script setup lang="ts">
import copy from 'assets/copy/en/app.yml'
</script>
