<style scoped>
.modal {
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* backdrop-filter: blur(2px); */
  transition: opacity 200ms ease-out;
}

.modal-position-top {
  justify-content: flex-start;
  padding-top: 4rem;
}

.modal-position-center {
  justify-content: center;
}

.modal-position-bottom {
  justify-content: flex-end;
  padding-bottom: 4rem;
}

.modal-hidden {
  visibility: hidden;
  opacity: 0;
}

.dialog-content {
  position: relative;
  display: inline-block;
  padding: 1rem;
  border-radius: var(--border-radius);
  transform-origin: center center;

  transition: all 200ms ease-out;

  box-shadow: var(--card-shadow);
}

.dialog-hidden-top {
  opacity: 0;
  transform: scale(0.5) translateY(-300%);
}

.dialog-hidden-bottom {
  opacity: 0;
  transform: scale(0.5) translateY(300%);
}

.dialog-title {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.dialog-close-button {
  position: absolute;
  top: .2rem;
  right: .2rem;
  color: var(--muted-text-color);
}
</style>

<template>
  <div
    ref="modal"
    :class="`modal ${_modalPositionClass} ${shown ? '' : 'modal-hidden'}`"
    :style="`background-color: rgba(0, 0, 0, ${dim ? 0.5 : '0'})`"
    @click="onOuterClick"
  >
    <div
      ref="dialog"
      :class="`dialog-content ${shown ? '' : (top ? 'dialog-hidden-top' : 'dialog-hidden-bottom')}`"
      :style="_dialogStyle"
      @click="onInnerClick"
    >
      <h4 v-if="title" class="dialog-title non-breaking-text">{{ title }}</h4>

      <slot />

      <div v-if="!empty" class="dialog-close-button">
        <ToolButton
          height="3rem"
          icon-height="1.5rem"
          :enabled="enabled"
          rounded
          @click="hide"
        >
          <CloseIcon />
        </ToolButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Dialog'
}
</script>

<script setup lang="ts">
import CloseIcon from 'assets/icons/close.svg?component'
import { computed, onBeforeUnmount, ref } from 'vue'
import { clamp } from '@/lib/utils'

const props = defineProps({
  modal: {
    type: Boolean,
    default: false,
    required: false
  },
  title: {
    type: String,
    default: null,
    required: false
  },
  top: {
    type: Boolean,
    default: false,
    required: false
  },
  bottom: {
    type: Boolean,
    default: false,
    required: false
  },
  enabled: {
    type: Boolean,
    default: true,
    required: false
  },
  empty: {
    type: Boolean,
    default: false,
    required: false
  },
  dim: {
    type: Boolean,
    default: false,
    required: false
  },
  backgroundColor: {
    type: String,
    default: 'var(--dialog-background-color)',
    required: false
  },
  modalAnimation: {
    type: String,
    default: 'bounce',
    required: false
  },
  width: {
    type: String,
    default: '',
    required: false
  },
  timeout: {
    type: Number,
    default: 0,
    required: false
  }
})

const emit = defineEmits(['opened', 'closed'])

defineExpose({
  show,
  hide
})

const MAX_TIMEOUT = 30000

let dismissTimeout : number
let animating = false

const modal = ref()
const dialog = ref()
const shown = ref(false)

const _dialogStyle = computed(() =>
  `${props.width ? `width: ${props.width};` : ''}` +
  `${props.backgroundColor ? `background: ${props.backgroundColor};` : ''}`
)

const _modalPositionClass = computed(() =>
  props.top
    ? 'modal-position-top'
    : props.bottom
      ? 'modal-position-bottom'
      : 'modal-position-center'
)

onBeforeUnmount(hide)

function onOuterClick(event: Event) {
  event.stopPropagation()
  if (props.modal) {
    if (props.modalAnimation) {
      animateDialog(props.modalAnimation)
    }
  } else {
    hide()
  }
}

function show() {
  if (shown.value) {
    return
  }

  // auto-hiding behavior
  if (props.timeout > 0) {
    dismissTimeout = window.setTimeout(
      hide,
      clamp(props.timeout, props.timeout, MAX_TIMEOUT)
    )
  }

  shown.value = true
  emit('opened')
}

function hide() {
  if (!shown.value) {
    return
  }

  if (dismissTimeout) {
    window.clearTimeout(dismissTimeout)
    dismissTimeout = 0
  }

  shown.value = false
  emit('closed')
}

function onInnerClick(event: Event) {
  event.stopPropagation()
}

function animateDialog(className: string) {
  if (!animating) {
    animating = true
    dialog.value.classList.add(className)
    dialog.value.addEventListener('animationend', () => {
      dialog.value.classList.remove(className)
      animating = false
    },
    { once: true })
  }
}
</script>
