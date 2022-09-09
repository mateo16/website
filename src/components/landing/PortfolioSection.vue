<style scoped>
.section {
  padding: var(--content-margin);
}

.image {
  display: inline-block;
  max-width: 26rem;
  margin: 0 1rem;
  transition: opacity .2s ease-out;
}

.text-pane {
  max-width: 20rem;
  transition: opacity .2s ease-out;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.caption {
  text-align: center;
  font-size: .7rem;
  font-weight: 350;
}

.arrow {
  position: absolute;
  top: 50%;
  stroke: var(--text-color);
  fill: none;
  height: 1rem;
  transition: opacity .3s linear;
}

@media (--hover) {
  .arrow:hover {
    cursor: pointer;
    opacity: .6;
  }
}

.left-arrow {
  left: 3%;
}

.right-arrow {
  right: 3%;
  transform: rotate(.5turn);
}

.paginator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>

<template>
  <section class="section pos-relative flex-col flex-center full-page non-selectable">
    <DualPaneLayout>
      <template #title>
        <IntersectionContainer animation-name="slide-in-left" margin="-10px" style="opacity: 0">
          <h1 class="gradient-text">{{ landing.portfolio.title }}</h1>
        </IntersectionContainer>
      </template>

      <template #first-pane>
        <IntersectionContainer animation-name="slide-in-left" margin="-10px" style="opacity: 0; animation-delay: .3s">
          <div ref="_image" class="image">
            <img :src="image" alt="">
          </div>
        </IntersectionContainer>
      </template>

      <template #second-pane>
        <IntersectionContainer animation-name="slide-in-right" margin="-10px" style="opacity: 0; animation-delay: .6s">
          <div ref="_text" class="text-pane flex-col flex-center">
            <span class="title link" @click="navigate(url, true)">{{ title }}</span>
            <p class="text-center" v-html="text"></p>
            <p class="caption" v-html="caption"></p>
          </div>
          </IntersectionContainer>
      </template>
    </DualPaneLayout>

    <svg
      class="arrow left-arrow"
      viewBox="0 0 29 54"
      xmlns="http://www.w3.org/2000/svg"
      @click="prev"
    >
      <path d="M27 2L2 27L27 52" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg
      class="arrow right-arrow"
      viewBox="0 0 29 54"
      xmlns="http://www.w3.org/2000/svg"
      @click="next"
    >
      <path d="M27 2L2 27L27 52" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <div class="paginator">
      <Paginator
        :count="landing.portfolio.content.length"
        :index="index"
        @selected="onPageSelected"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import landing from 'assets/copy/en/landing.yml'
import { preloadImage, navigate } from '@/lib/utils'
import { getAppConfig } from '@/lib/config'

const config = getAppConfig()
const index = ref(0)
const _text = ref()
const _image = ref()

const image = computed((): string => landing.portfolio.content[index.value].image)
const title = computed((): string => landing.portfolio.content[index.value].title)
const url = computed((): string => landing.portfolio.content[index.value].url)
const text = computed((): string => landing.portfolio.content[index.value].text)
const caption = computed((): string => landing.portfolio.content[index.value].caption)

let activeIndex = 0
let transitionEnabled = true
let timeoutId: number
const transitionIntervalMS = 6000

onMounted(() => {
  for (const item of landing.portfolio.content) {
    preloadImage(`${config.appUrl}${item.image}`)
  }

  timeoutId = window.setInterval(next, transitionIntervalMS)
})

onBeforeUnmount(() => {
  window.clearInterval(timeoutId)
})

const onPageSelected = (index: number) => {
  if (transitionEnabled && activeIndex !== index) {
    transitionEnabled = false
    activeIndex = index
    doTransition()
  }
}

const next = () => {
  if (transitionEnabled) {
    transitionEnabled = false
    activeIndex += 1
    if (activeIndex === landing.portfolio.content.length) {
      activeIndex = 0
    }
    doTransition()
  }
}

const prev = () => {
  if (transitionEnabled) {
    transitionEnabled = false
    activeIndex -= 1
    if (activeIndex === -1) {
      activeIndex = landing.portfolio.content.length - 1
    }
    doTransition()
  }
}

const doTransition = () => {
  _text.value.style.opacity = 0;
  _image.value.style.opacity = 0;

  _image.value.addEventListener('transitionend', () => {
    index.value = activeIndex
    nextTick(() => {
      _text.value.style.opacity = 1;
      _image.value.style.opacity = 1;

      _image.value.addEventListener('transitionend', () => {
        transitionEnabled = true
      }, {once: true})
    })


  }, {once: true})
}
</script>
