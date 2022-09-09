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

.title-pane {
  position: relative;
}

.dual-pane {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: var(--content-margin);
  align-items: center;
  width: 100%;
  height: 100%;
}

@media (--landscape) {
  .dual-pane {
    flex-wrap: nowrap;
  }
}

.pane {
  position: relative;
  display: flex;
}
</style>

<template>
  <div class="container flex-col">
    <div class="title-pane" :style="debug ? 'outline: 1px dashed #c07600' : ''">
      <slot name="title" />
    </div>

    <div class="dual-pane" :style="debug ? 'outline: 1px dashed #628800' : ''">

      <div class="pane" :style="debug ? 'outline: 1px dashed #ff008c' : ''">
        <slot name="first-pane" />
      </div>
      <div class="pane" :style="debug ? 'outline: 1px dashed #0076a9' : ''">
        <slot name="second-pane" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  debug: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
