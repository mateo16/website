<style scoped>
.team-card {
  max-width: 10rem;
  margin: 1rem 0;

  justify-content: space-between;
  align-items: center;

  border-radius: .5rem;
  background-color: var(--callout-color);
  border: var(--decoration-line-thickness) solid var(--highlighted-callout-color);
  padding: 1rem;
  transition: all 150ms ease-out;
}

@media (--hover) {
  .team-card:hover {
    scale: 1.02;
    background-color: var(--highlighted-callout-color);
    /* cursor: pointer; */
  }
}

.team-photo {
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: .3rem solid var(--highlighted-callout-color);

  /* FIX: fixes a Safari bug where square aspect ratio + border distors images */
  box-sizing: content-box;
}

.team-name {
  font-size: .8rem;
  font-weight: 600;
  margin-top: .5rem;
  min-height: 1.4rem;
  line-height: 1.1rem;
}

.team-title {
  font-size: .7rem;
  font-weight: 500;
  line-height: 1rem;
  margin-bottom: 1rem;
}
</style>

<template>
  <div class="team-card pos-relative flex-col">
    <div class="flex-col flex-center">
      <img class="team-photo" :src="props.photoUrl" :alt="props.name" />
      <span class="team-name selectable text-center">{{ props.name }}</span>
      <span class="team-title text-center">{{ props.title }}</span>
    </div>
    <SocialButtonGroup
      :linkedin="props.linkedinUrl"
      :twitter="props.twitterUrl"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  photoUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: '',
    required: false
  },
  title: {
    type: String,
    default: '',
    required: false
  },
  linkedinUrl: {
    type: String,
    default: null,
    required: false
  },
  twitterUrl: {
    type: String,
    default: null,
    required: false
  }
})
</script>
