<template>
  <div class="flex-row flex-gap">
    <LinkedInLogo
      v-if="props.linkedin"
      class="icon-button"
      @click="onNavigateLinkedIn"
    />

    <GitHubLogo
      v-if="props.github"
      class="icon-button"
      @click="onNavigateGitHub"
    />

    <TwitterLogo
      v-if="props.twitter"
      class="icon-button"
      @click="onNavigateTwitter"
    />
  </div>
</template>

<script setup lang="ts">
import LinkedInLogo from 'assets/icons/social/linkedin.svg?component'
import GitHubLogo from 'assets/icons/social/github.svg?component'
import TwitterLogo from 'assets/icons/social/twitter.svg?component'
import { navigate } from '@/lib/utils'
import { trackSocial } from '@/lib/analytics'

const props = defineProps({
  linkedin: {
    type: String,
    required: false,
    default: null
  },
  github: {
    type: String,
    required: false,
    default: null
  },
  twitter: {
    type: String,
    required: false,
    default: null
  }
})

const onNavigateLinkedIn = () => {
  trackSocial('linkedin')
  navigate(props.linkedin, true)
}

const onNavigateGitHub = () => {
  trackSocial('github')
  navigate(props.github, true)
}

const onNavigateTwitter = () => {
  trackSocial('twitter')
  navigate(props.twitter, true)
}
</script>
