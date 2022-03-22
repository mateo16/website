<template>
  <main>
    <router-view />
  </main>
  <Nav />
  <Notification />
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout'
}
</script>
