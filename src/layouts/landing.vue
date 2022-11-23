<template>
  <main class="pos-relative overflow-x-hidden">
    <router-view />
  </main>
  <Nav />
  <Footer />
  <Notification />
  <DevModeBanner />
</template>

<script lang="ts">
export default {
  name: 'LandingLayout'
}
</script>
