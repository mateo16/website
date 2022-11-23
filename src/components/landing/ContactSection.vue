<style scoped>
.section {
  background-color: var(--background-color);

  justify-content: flex-start;
  align-items: center;
  padding: var(--content-margin);
}
</style>

<template>
  <section id="contact" class="section pos-relative flex-col flex-center full-page">
    <h1 class="color-text">{{ copy.contact.title }}</h1>
    <div class="content-section">
      <p v-html="copy.contact.message.replaceAll('{EMAIL}', appConfig.contactEmailAddress)"></p>
      <ContactForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import copy from 'assets/copy/en/app.yml'
import { getAppConfig } from '@/lib/config'

const appConfig = getAppConfig()
</script>
