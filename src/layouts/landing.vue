<template>
  <router-view />
  <Footer />
  <Nav />
  <Notification />
</template>

<script lang="ts">
export default {
  name: 'LandingLayout'
}
</script>

<script setup lang="ts">
import { useColorSchemeManager } from '@/lib/colorScheme'
import { onMounted, onBeforeUnmount } from 'vue'

const schemeManager = useColorSchemeManager()

onMounted(() => { schemeManager.setDark() })

onBeforeUnmount(() => { schemeManager.setAuto() })
</script>
