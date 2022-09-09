<style scoped>
.button {
  background-color: var(--border-color);
  position: relative;
  height: 2.6rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  margin: 0;
  overflow: hidden;
  transition: all 150ms ease-out;

  box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.4);
}

.button-icon {
  position: absolute;
  left: 1rem;
  height: 1.5rem;
  width: 1.5rem;
}

.button-text {
  position: relative;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: normal;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  pointer-events: none;
  transition: all 150ms ease-out;
}

@media (--hover) {
  .button:hover {
    cursor: pointer;
    box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }

  .button:hover > .button-text {
    font-weight: 900;
  }
}

.text-with-icon {
  padding-left: 1.5rem;
}

.button-background {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.1s linear, background-color 200ms linear;
  transform-origin: center left;
  transform: scaleX(1.0);
}

.button-glow {
  animation-name: glow;
  animation-duration: 500ms;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes glow {
  from { opacity: 0.1 }
  to   { opacity: 1 }
}
</style>

<template>
  <div
    class="button"
    :style="style_"
    @click="onClick"
  >
    <div :class="`button-background ${loading ? 'button-glow': ''}`" :style="backgroundStyle_" />
    <div v-if="icon" class="button-icon" v-html="svg_" />
    <span :class="`button-text non-breaking-text ${icon ? 'text-with-icon' : ''}`">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { clamp } from '@/lib/utils'
import { useRouter } from 'vue-router'

const props = defineProps({
  icon: {
    type: String,
    default: null,
    required: false
  },
  text: {
    type: String,
    default: null,
    required: false
  },
  to: {
    type: String,
    default: null,
    required: false
  },
  color: {
    type: String,
    default: 'var(--main-gradient)',
    required: false
  },
  textColor: {
    type: String,
    default: 'var(--background-color)',
    required: false
  },
  enabled: {
    type: Boolean,
    default: true,
    required: false
  },
  progress: {
    type: Number,
    default: 1.0,
    required: false
  },
  loading: {
    type: Boolean,
    default: false,
    required: false
  }
})

const router = useRouter()

const style_ = computed(() =>
  `${props.enabled ? '' : 'pointer-events: none;'}` +
  `color: ${props.enabled ? props.textColor : 'var(--muted-text-color)'}`
)

const backgroundStyle_ = computed(() =>
  `transform: scaleX(${clamp(props.progress, 0, 1)});` +
  `background: ${props.enabled ? props.color : 'var(--border-color)'};`
)

const svg_ = computed(async () => {
  if (props.icon) {
  //   return await import(`@/assets/icons/${props.icon}.svg`)
  // } else {
    return null
  }
})

const doRipple = (event: Event) => {
  const parent = event.currentTarget as HTMLElement;
  if (parent) {
    const ripple = document.createElement('div');
    ripple.style.width = ripple.style.height = '100%';
    ripple.style.top = ripple.style.left = '0';
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    ripple.classList.add('ripple');
    parent.appendChild(ripple);
  }
}

const onClick = (event: Event) => {
  if (props.enabled) {
    doRipple(event)
    if (props.to) {
      router.push(props.to)
    }
  }
}

defineExpose({
  doRipple,
  onClick
})
</script>
