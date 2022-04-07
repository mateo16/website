<style scoped>
.footer {
  position: absolute;
  /* position: relative; */
  bottom: 0;
  width: 100%;
  /* min-height: var(--nav-height); */
  padding: 0 var(--content-margin);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  align-items: center;

  transition: transform 400ms ease-out;

  border-top: .04rem solid var(--border-color);
  /* background-color: var(--background-color-callout); */
  /* border: 1px solid yellow; */
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
    <span>{{ copy.company }} {{ thisYear }} – {{ copy.footer.copyright }}</span>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import copy from '@/assets/copy/en/app.yml'

const thisYear = computed(() => `${new Date().getFullYear()}`)
</script>
