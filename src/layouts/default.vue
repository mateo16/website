<template>
  <main>
    <router-view />
  </main>
  <Nav />
  <Footer />
  <Notification />
  <DevModeBanner />
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout'
}
</script>
