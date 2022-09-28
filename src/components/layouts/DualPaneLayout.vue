<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.dual-pane {
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: var(--content-margin);
  width: 100%;
  height: 100%;
}

@media (--landscape) {
  .dual-pane {
    flex-wrap: nowrap;
  }
}
</style>

<template>
  <div class="container flex-col">
    <div class="pos-relative" :style="debug ? 'outline: 1px dashed #c07600' : ''">
      <slot name="title" />
    </div>

    <div
      class="dual-pane pos-relative flex-row"
      :style="_style"
    >
      <div class="pos-relative flex-col" :style="debug ? 'outline: 1px dashed #ff008c' : ''">
        <slot name="first-pane" />
      </div>
      <div class="pos-relative flex-col" :style="debug ? 'outline: 1px dashed #0076a9' : ''">
        <slot name="second-pane" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  debug = false,
  alignment = 'stretch'
} = defineProps<{
  debug?: boolean
  alignment?: string
}>()

const _style = $computed(() => debug ? 'outline: 1px dashed #628800' : '' + `; align-items: ${alignment}`)
</script>
