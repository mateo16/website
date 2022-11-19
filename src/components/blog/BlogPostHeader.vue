<style scoped>
.author-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.author-photo {
  display: inline;
  position: relative;
  border-radius: 50%;
}

.author-name {
  position: relative;
  font-size: .9rem;
  font-weight: 450;
  letter-spacing: 0.04rem;
  line-height: 1.4rem;
  text-transform: capitalize;
}

.post-date {
  color: var(--muted-text-color);
  position: relative;
  font-size: .7rem;
  font-weight: 450;
  line-height: 1rem;
  letter-spacing: 0.02rem;
  text-transform: capitalize;
  margin-bottom: .5rem;
}
</style>

<template>
  <h1 v-if="props.title" class="text-shadow">{{ props.title }}</h1>

  <h4 v-if="props.description">{{ props.description }}</h4>

  <div v-if="authorInfo" class="author-row">
    <img
      class="author-photo"
      :style="`width: ${props.photoSize}; height: ${props.photoSize}`"
      :src="authorInfo.photoUrl"
      alt="author profile photo"
    />

    <div class="flex-col">
      <span class="author-name selectable">{{ authorInfo.name }}</span>

      <span class="post-date">{{ formatDate(props.date) }}</span>

      <SocialButtonGroup
        v-if="props.socialLinks"
        :linkedin="authorInfo.linkedin"
        :twitter="authorInfo.twitter"
        :github="authorInfo.github"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import company from '@/config/company.yml'
import { formatDate } from '@/lib/utils'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: null
  },
  description: {
    type: String,
    required: false,
    default: null
  },
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
    default: "4rem"
  },
  socialLinks: {
    type: Boolean,
    required: false,
    default: true
  }
})

const authorInfo = company.team[props.author]
</script>
