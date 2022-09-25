<style scoped>
.carrousell-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 17rem;
  height: 17rem;

  margin-top: 2rem;

  /* outline: 1px solid cyan; */
}

.carrousell-container :deep(.icon-wrapper) {
  position: absolute;
  width: 20%;
  height: 20%;
  transition: transform 400ms ease-out;
}

.carrousell-container :deep(.icon-wrapper .icon) {
  transition: transform 400ms ease-out;
}

.backdrop {
  position: absolute;
  width: 95%;
  height: 95%;
  stroke: var(--border-color);
  stroke-width: .01rem;
}
</style>

<template>
  <div ref="container" class="carrousell-container">
    <svg class="backdrop" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

const elements: HTMLElement[] = []

const container = $ref<HTMLElement>()

const translation = 'translateY(-7rem)'

let iteration: number = 0
let focusedElement: number = 0

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  iconGrowthFactor: {
    type: Number,
    required: false,
    default: 2.5
  },
  iconShrinkFactor: {
    type: Number,
    required: false,
    default: 0.8
  }
})

function createElements() {
  const images = []

  // DON'T ASK...
  let k = 0
  for (let i = 0; i < props.images.length; i += 1) {
    images.push(props.images[k])
    k -= 1
    if (k === -1) k = props.images.length - 1
  }

  for (let i = 0; i < images.length; i += 1) {
    const div = window.document.createElement('div')
    const img = window.document.createElement('img')
    div.classList.add('icon-wrapper')
    img.src = images[i] as string
    img.classList.add('icon')
    div.appendChild(img)
    container.appendChild(div)
    elements.push(div)
  }
}

defineExpose({
  cycle
})

function cycle() {
  const rotationDelta = 1.0 / elements.length
  for (let i = 0; i < elements.length; i += 1) {
    const div = elements[i]
    const img = div.children[0] as HTMLElement

    const angle = (i + iteration) * rotationDelta
    div.style.transform = `rotate(${angle}turn) ${translation}`
    img.style.transform = `rotate(-${angle}turn) ${i === focusedElement ? `scale(${props.iconGrowthFactor})` : `scale(${props.iconShrinkFactor})`}`
  }

  iteration += 1
  focusedElement -= 1
  if (focusedElement === -1) {
    focusedElement = elements.length - 1
  }
}

onMounted(() => {
  createElements()
  cycle()
  focusedElement = elements.length - 1
})

onBeforeUnmount(() => {
  for (const e of elements) {
    e.remove()
  }
})
</script>
