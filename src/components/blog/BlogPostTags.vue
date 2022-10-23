<style scoped>
.tag-container {
  gap: .3rem;
}

.tag {
  font-size: .7rem;
  font-weight: 500;
  line-height: 1em;
  letter-spacing: 0.04rem;
  padding: .3rem;
  text-transform: lowercase;
  color: var(--text-color);
  border-radius: var(--border-radius);

  transition: color .1s linear,  background .1s linear;
}

.tag-background {
  background-color: var(--callout-color);
}

.tag-border {
  border: var(--decoration-line-thickness) solid  var(--border-color);
}

.active-tag {
  color: var(--background-color);
  background-color: var(--text-color);
}

@media (--hover) {
  .tag:hover {
    color: var(--text-color);
    cursor: pointer;
  }

  .tag-background:hover {
    background-color: var(--border-color);
  }
}
</style>

<template>
  <div class="tag-container flex-row flex-wrap">
    <div
      class="tag link"
      :class="{
        'active-tag': activeTag === tag,
        'tag-border': borders,
        'tag-background': backgrounds
      }"
      v-for="tag in tags"
      @click="(e: Event) => onTagSelected(e, tag)"
    >
      <span>#{{tag}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['tag-selected'])

const {
  tags,
  activeTag = '',
  borders = false,
  backgrounds = false
} = defineProps<{
  tags: string[],
  activeTag?: string,
  borders?: boolean,
  backgrounds?: boolean,
}>()

const onTagSelected = (e: Event, tag: string) => {
  e.stopPropagation()
  emit('tag-selected', tag)
}
</script>
