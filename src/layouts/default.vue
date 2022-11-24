<style scoped>
.content-wrapper {
  padding-top: var(--nav-height);
  padding-right: var(--content-margin);
  padding-left: var(--content-margin);
}
</style>

<template>
  <main class="content-wrapper pos-relative overflow-x-hidden">
    <router-view />
  </main>
  <Nav no-hide />
  <Footer />
  <Notification />
  <DevModeBanner />
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout'
}
</script>
