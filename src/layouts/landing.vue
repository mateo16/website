<template>
  <router-view />
  <Footer />
  <Nav />
</template>

<script setup lang="ts">
import { useColorSchemeManager } from '@/lib/colorScheme'
import { onMounted, onBeforeUnmount } from 'vue'

const schemeManager = useColorSchemeManager()

onMounted(() => { schemeManager.setDark() })

onBeforeUnmount(() => { schemeManager.setAuto() })
</script>
