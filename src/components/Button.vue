<style scoped>
.button {
  background-color: var(--border-color);
  position: relative;
  min-height: 3rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  margin: 0;
  overflow: hidden;
  transition: all 150ms linear;

  box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.4);
}

@media (--hover) {
  .button:hover {
    cursor: pointer;
    opacity: 0.85;
    box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.3);
  }
}

.button-icon {
  position: absolute;
  left: 1rem;
  height: 1.5rem;
  width: 1.5rem;
}

.button-text {
  position: relative;
  font-weight: 900;
  font-size: 1.2rem;
  line-height: normal;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  pointer-events: none;
}

.text-with-icon {
  padding-left: 1.5rem;
}

.button-background {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.1s linear, background-color 0.1s linear;
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

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { clamp } from '@/lib/utils'

export default defineComponent({
  name: 'Button',
  props: {
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
    color: {
      type: String,
      default: 'var(--accent-color)',
      required: false
    },
    textColor: {
      type: String,
      default: '#000',
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
  },

  setup(props, context) {
    const style_ = computed(() =>
      `${props.enabled ? '' : 'pointer-events: none;'}` +
      `color: ${props.enabled ? props.textColor : 'var(--muted-text-color)'}`
    )

    const backgroundStyle_ = computed(() =>
      `transform: scaleX(${clamp(props.progress, 0, 1)});` +
      `background-color: ${props.enabled ? props.color : 'var(--border-color)'};`
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
        doRipple(event);
      }
    }

    return {
      style_,
      backgroundStyle_,
      svg_,
      doRipple,
      onClick
    }
  }
});
</script>
