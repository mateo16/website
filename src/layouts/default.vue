<template>
  <main>
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
