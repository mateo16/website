<template>
  <main>
    <router-view />
  </main>
  <Footer />
  <Nav scroll-target="app" />
  <Notification />
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout'
}
</script>
