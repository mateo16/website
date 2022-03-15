<style scoped>
.author-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
  /* outline: 1px solid cyan; */
}

.author-photo {
  display: inline;
  position: relative;
  padding: .1rem;
  border: var(--decoration-line-thickness) solid var(--border-color);
  border-radius: 50%;
  transition: border 150ms ease;
}

.post-info {
  font-size: .9rem;
  text-transform: capitalize;
}

@media (--hover) {
  .author-photo:hover {
    border: var(--decoration-line-thickness) solid var(--accent-color);
  }
}
</style>

<template>
  <div v-if="authorInfo" class="author-row">
    <img
      class="author-photo"
      :style="`width: ${props.photoSize}; height: ${props.photoSize}`"
      :src="authorInfo.photoUrl"
      alt="author profile photo"
      @click="navigate(authorInfo.profileUrl)"
    />
    <span class="post-info">
      <a
        style="font-weight: inherit; color: var(--text-color)"
        :href="authorInfo.profileUrl"
        target="_blank"
      >
        {{ authorInfo.name }}
      </a>
      <span v-if="props.date">{{ ', ' + formatDate(props.date) }}</span>
    </span>

  </div>
</template>

<script setup lang="ts">
import config from '@/assets/config.yml'
import { navigate, formatDate } from '@/lib/utils'

const props = defineProps({
  author: {
    type: String,
    required: false,
    default: null
  },
  date: {
    type: String,
    required: false,
    default: null
  },
  photoSize: {
    type: String,
    required: false,
    default: "2.4rem"
  }
})

const authorInfo = config.authors[props.author]
</script>
