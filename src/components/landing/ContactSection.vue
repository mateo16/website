<style scoped>
.section {
  background-image: url('assets/images/blocks.jpg');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;

  justify-content: flex-start;
  align-items: center;
  padding: var(--content-margin);
}
</style>

<template>
  <section id="contact" class="section pos-relative flex-col flex-center full-page">
    <h1 class="color-text">{{ copy.contact.title }}</h1>
    <div class="content">
      <p v-html="copy.contact.text1.replaceAll('{EMAIL}', appConfig.contactEmailAddress)"></p>
      <p>{{ copy.contact.text2 }}</p>
      <ContactForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import copy from 'assets/copy/en/app.yml'
import { getAppConfig } from '@/lib/config'

const appConfig = getAppConfig()
</script>
