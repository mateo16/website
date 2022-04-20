<style scoped>
.author-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
}

.author-photo {
  display: inline;
  position: relative;
  padding: .05rem;
  border: var(--text-decoration-line-thickness) solid var(--border-color);
  border-radius: 50%;
  transition: border 150ms ease;
}

.post-info {
  font-size: .8rem;
  letter-spacing: 0.01rem;
  text-transform: capitalize;
}

@media (--hover) {
  .social-logo:hover {
    color: var(--accent-color);
    cursor: pointer;
  }
}

.social-logo {
  width: 1rem;
  height: 1rem;
  transition: color 100ms linear;
}
</style>

<template>
  <h1 v-if="props.title">{{ props.title }}</h1>
  <div v-if="authorInfo" class="author-row">
    <img
      class="author-photo"
      :style="`width: ${props.photoSize}; height: ${props.photoSize}`"
      :src="authorInfo.photoUrl"
      alt="author profile photo"
    />

    <span class="post-info">{{ `${authorInfo.name}, ${formatDate(props.date)}` }}</span>

    <svg
      v-if="props.socialLinks && authorInfo.linkedin"
      class="social-logo"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      @click="navigate(authorInfo.linkedin, true)"
    >
      <path fill="currentColor" d="M426.032 426.03H351.946V309.999C351.946 282.33 351.452 246.712 313.414 246.712C274.827 246.712 268.922 276.857 268.922 307.984V426.021H194.838V187.415H265.959V220.023C280.44 195.261 308.463 180.417 337.129 181.482C412.218 181.482 426.064 230.875 426.064 295.135L426.032 426.03ZM111.245 154.799C87.6594 154.799 68.2426 135.392 68.2426 111.805C68.2426 88.2173 87.6505 68.808 111.236 68.808C134.819 68.808 154.225 88.2128 154.229 111.796C154.229 135.378 134.826 154.797 111.245 154.799ZM148.287 426.03H74.1245V187.415H148.287V426.03ZM462.965 0.00317357H36.8946C16.8942 -0.222724 0.243771 16.0419 0 36.0439V463.916C0.234826 483.929 16.883 500.212 36.8946 499.997H462.965C483.026 500.25 499.732 483.97 500 463.916V36.0148C499.732 15.9703 483.003 -0.260746 462.965 0.00317357Z" />
    </svg>

    <svg
      v-if="props.socialLinks && authorInfo.twitter"
      class="social-logo"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      @click="navigate(authorInfo.twitter, true)"
    >
      <path fill="currentColor" d="M436.883 154.098C437.169 158.242 437.169 162.387 437.169 166.569C437.169 294.016 340.172 441 162.807 441V440.924C110.413 441 59.1073 425.988 15 397.684C22.6185 398.601 30.2752 399.059 37.951 399.078C81.3709 399.116 123.55 384.544 157.709 357.71C116.447 356.927 80.2635 330.017 67.6232 290.731C82.0774 293.519 96.9708 292.946 111.158 289.069C66.1721 279.978 33.8076 240.444 33.8076 194.53C33.8076 194.11 33.8076 193.709 33.8076 193.308C47.2117 200.775 62.2196 204.92 77.5712 205.378C35.2015 177.055 22.1412 120.675 47.7272 76.595C96.6843 136.852 168.917 173.483 246.458 177.36C238.687 143.861 249.303 108.757 274.354 85.2086C313.192 48.6917 374.274 50.5633 410.781 89.3912C432.377 85.1322 453.075 77.2062 472.016 65.9761C464.818 88.3026 449.752 107.268 429.627 119.319C448.74 117.065 467.414 111.947 485 104.135C472.054 123.54 455.748 140.442 436.883 154.098Z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import config from '@/assets/config.yml'
import { navigate, formatDate } from '@/lib/utils'

const props = defineProps({
  title: {
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
    default: "2.4rem"
  },
  socialLinks: {
    type: Boolean,
    required: false,
    default: true
  }
})

const authorInfo = config.authors[props.author]
</script>
