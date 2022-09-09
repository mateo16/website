<template>
  <main>
    <router-view />
  </main>
  <Nav />
  <Footer />
  <Notification />
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout'
}
</script>
