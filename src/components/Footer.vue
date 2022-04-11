<style scoped>
.footer {
  position: absolute;
  /* position: relative; */
  bottom: 0;
  width: 100%;
  padding: 0 var(--content-margin);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  align-items: center;

  transition: transform 400ms ease-out;

  border-top: .04rem solid var(--border-color);
  backdrop-filter: blur(3px);
  min-height: var(--footer-height);
}

.footer-text {
  font-size: .7rem;
  font-weight: 200;
  color: var(--muted-text-color);
  text-transform: uppercase;
}

</style>

<template>
  <footer class="footer footer-text non-selectable">
    <span>{{ copy.company }}™ {{ thisYear }} – {{ copy.footer.copyright }}</span>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import copy from '@/assets/copy/en/app.yml'

const thisYear = computed(() => `${new Date().getFullYear()}`)
</script>
