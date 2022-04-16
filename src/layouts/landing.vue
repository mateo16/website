<template>
  <router-view />
  <Footer scroll-target="app" />
  <Nav scroll-target="app" />
</template>

<script lang="ts">
export default {
  name: 'LandingPageLayout'
}
</script>

<script setup lang="ts">
import { useColorSchemeManager } from '@/lib/colorScheme'
import { onMounted, onBeforeUnmount } from 'vue'

const schemeManager = useColorSchemeManager()

onMounted(() => { schemeManager.setDark() })

onBeforeUnmount(() => { schemeManager.setAuto() })
</script>
