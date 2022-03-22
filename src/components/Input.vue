<style scoped>
.field {
  /* width: 100%; */
  position: relative;
  border-bottom: 1px solid var(--border-color);
  border-radius: .2rem .2rem 0 0;
  margin: 2rem auto 1rem;
  transition: background 300ms;
}

@media (--hover) {
  .field:hover {
    background: #0001;
  }
}

.field::after {
  content: "";
  position: relative;
  display: block;
  height: var(--decoration-line-thickness);
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: 0%;
  opacity: 0;
  transition: all 300ms ease;
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

.field:focus-within .label,
.input:not(:placeholder-shown) + .label {
  transform: scale(0.8) translateX(.2em) translateY(-2em);
  opacity: 1;
}

.input {
  outline: none;
  border: none;
  overflow: hidden;
  margin: 0;
  width: 100%;
  /* padding: 0.25rem 0; */
  background: none;
  font-size: 1.2rem;
  padding-left: .5em;
  font-family: var(--primary-font);
  font-weight: 900;
  letter-spacing: 0.02rem;

  transition: border 500ms;
  color: var(--text-color);
}

.disabled {
  color: var(--border-color);
  -webkit-text-fill-color: var(--border-color);
}

.invalid {
  color: var(--error-color);
}

.password-visibility-toggle {
  position: absolute;
  cursor: help;
  font-size: 0.8rem;
  right: 0.25rem;
  bottom: 0.5rem;
}

.label {
  display: block;
  color: var(--muted-text-color);
  position: absolute;
  /* font-size: 1.2rem;
  font-weight: 500; */
  pointer-events: none;
  text-transform: uppercase;
  padding-left: .5em;
  transform: translateY(0.4rem);
  top: 0;
  left: 0;
  transform-origin: 0%;
  transition: transform 300ms;
}
</style>

<template>
  <div class="field">
    <input
      ref="input"
      :type="type === 'password' && showPassword ? 'text' : type"
      :name="name"
      :disabled="!enabled"
      :class="`input${enabled ? '' : ' disabled'}${invalidMessage ? ' invalid' : ''}`"
      :maxlength="maxLength"
      placeholder=" "
      @input="onValueChanged"
      @keypress.enter="emit('enter')"
    />

    <label
      ref="label"
      :for="name"
      class="label non-breaking-text"
      :style="invalidMessage ? 'color: var(--error-color);' : ''"
    >
      {{ invalidMessage ? invalidMessage : name }}
    </label>

    <span
      v-if="type === 'password'"
      class="password-visibility-toggle"
      @mouseenter="() => showPassword = true"
      @mouseleave="() => showPassword = false"
    >
      {{ showPassword ? '🙈' : '👀' }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Input'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  name: {
    type: String,
    required: false,
    default: ''
  },
  validator: {
    type: Function,
    required: false,
    default: () => ''
  },
  maxLength: {
    type: Number,
    required: false,
    default: 40
  },
  enabled: {
    type: Boolean,
    required: false,
    default: true
  }
})

const emit = defineEmits([
  'value-changed',
  'enter'
])

const showPassword = ref(false)
const invalidMessage = ref('')
const input = ref()
const value = ref()

function onValueChanged(event: Event) {
  if (event.target) {
    value.value = (event.target as HTMLInputElement).value
    if (props.validator) {
      invalidMessage.value = props.validator(value.value);
    }
    emit('value-changed', value.value)
  }
}

function clear() {
  if (value.value) {
    input.value.value = null;
    invalidMessage.value = '';
    value.value = null
    emit('value-changed', value.value)
  }
}

defineExpose({
  clear,
  value
})
</script>
