<template>
  <main>
    <router-view />
  </main>
  <Nav scroll-target="app" />
  <Footer scroll-target="app" />
  <Notification />
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout'
}
</script>
