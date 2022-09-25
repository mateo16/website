<style scoped>
.field {
  position: relative;
  border-bottom: 1px solid var(--border-color);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  margin: 2rem auto 1rem;
  transition: background 300ms;
}

@media (--hover) {
  .field:hover {
    background: #fff2;
    cursor: text;
  }
}

.field::after {
  content: "";
  position: relative;
  display: block;
  height: var(--decoration-line-thickness);
  background: var(--main-gradient);
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
  color: var(--text-color);
  caret-color: var(--text-color);
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
      :class="`text-input selectable ${enabled ? '' : ' disabled'}${invalidMessage ? ' invalid' : ''}`"
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

const textInput = $ref<HTMLSpanElement>()
let invalidMessage = $ref('')
let text = $ref('')

const onClick = () => {
  if (textInput) {
    textInput.focus()
  }
}

const onKeyPressed = (event: KeyboardEvent) => {
  if (text.length >= props.maxLength ||
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
  if (text !== value) {
    text = value
    if (props.validator) {
      invalidMessage = props.validator(text);
    }
    emit('text-changed', text)
  }
}

const clear = () => {
  if (text && textInput) {
    textInput.innerText = '';
    updateText('')
  }
}

defineExpose({
  clear,
  text
})
</script>
