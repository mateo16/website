<style scoped>
.field {
  position: relative;
  border-bottom: 1px solid var(--border-color);
  border-radius: .2rem .2rem 0 0;
  margin: 2rem auto 1rem;
  transition: background 300ms;
}

@media (--hover) {
  .field:hover {
    background: #0001;
    cursor: text;
  }
}

.field::after {
  content: "";
  position: relative;
  display: block;
  height: var(--text-decoration-line-thickness);
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: 0%;
  opacity: 0;
  transition: transform 300ms ease-out, opacity  300ms ease-out;
  top: 2px;
}

.field:focus-within {
  border-color: transparent;
  background: none;
}

.field:focus-within::after {
  transform: scaleX(1);
  opacity: 1;
}

.field:focus-within .label, .text-input:not(:empty) + .label {
  transform: scale(0.8) translateX(.2em) translateY(-2em);
  opacity: 1;
}

.text-input {
  display: block;
  outline: none;
  border: none;
  overflow: hidden;
  width: 100%;
  margin-left: .5em;
  background: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  user-select: text;
  color: var(--text-color);
  caret-color: var(--accent-color);
  transition: border 500ms, color 200ms;
}

.disabled {
  color: var(--muted-text-color);
  -webkit-text-fill-color: var(--muted-text-color);
}

.invalid {
  color: var(--error-color);
}

.label {
  display: block;
  color: var(--muted-text-color);
  position: absolute;
  pointer-events: none;
  text-transform: uppercase;
  padding-left: .5em;
  top: 0;
  left: 0;
  transform-origin: top left;
  transition: transform 300ms, color 200ms;
}
</style>

<template>
  <div class="field" @click="onClick">
    <span
      ref="textInput"
      :contenteditable="enabled"
      :class="`text-input ${enabled ? '' : ' disabled'}${invalidMessage ? ' invalid' : ''}`"
      :maxlength="maxLength"
      @input="onEdit"
      @keypress="onKeyPressed"
    />

    <label
      ref="label"
      :for="name"
      class="label non-breaking-text"
      :style="invalidMessage ? 'color: var(--error-color);' : ''"
    >
      {{ invalidMessage ? invalidMessage : name }}
    </label>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: ''
  },
  maxLength: {
    type: Number,
    required: false,
    default: 40
  },
  validator: {
    type: Function,
    required: false,
    default: () => ''
  },
  enabled: {
    type: Boolean,
    required: false,
    default: true
  },
  multiline: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['text-changed'])

const textInput = ref<HTMLSpanElement>()
const invalidMessage = ref('')
const text = ref('')

const onClick = (event: Event) => {
  if (textInput.value) {
    textInput.value.focus()
  }
}

const onKeyPressed = (event: KeyboardEvent) => {
  if (text.value.length >= props.maxLength ||
      (event.key === 'Enter' && !props.multiline)) {
    event.preventDefault()
  }
}

const onEdit = (event: Event) => {
  if (event.target) {
    updateText((event.target as HTMLSpanElement).innerText)
  }
}

const updateText = (value: string) => {
  if (text.value !== value) {
    text.value = value
    if (props.validator) {
      invalidMessage.value = props.validator(text.value);
    }
    emit('text-changed', text.value)
  }
}

const clear = () => {
  if (text.value && textInput.value) {
    textInput.value.innerText = '';
    updateText('')
  }
}

defineExpose({
  clear,
  text
})
</script>
