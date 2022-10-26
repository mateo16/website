<style scoped>
.section {
  padding: var(--content-margin);
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
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
  bottom: 0;
}

.brand-card-container {
  gap: .3rem;
}

.brand-card {
  justify-content: flex-start;
  align-items: center;
  gap: .3rem;
  padding: .1rem .3rem;
  border-radius: var(--border-radius);
  font-family: var(--code-font);
  font-size: .6rem;
  line-height: 1rem;

  border: var(--decoration-line-thickness) solid var(--border-color);
  transition: background .1s linear;
}

@media (--hover) {
  .brand-card:hover {
    background: var(--border-color);
  }
}

.tech-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.tech-stack-title {
  margin-bottom: .3rem;
}
</style>

<template>
  <section id="projects" class="section pos-relative flex-col flex-gap full-page scroll-snap-y-soft scroll-snap-align-start">
    <DualPaneLayout>
      <template #title>
        <IntersectionContainer once animation-name="slide-in-left" margin="-10px" style="opacity: 0">
          <h1 class="color-text">{{ landing.portfolio.title }}</h1>
        </IntersectionContainer>
      </template>

      <template #first-pane>
        <IntersectionContainer
          once
          animation-name="slide-in-left"
          style="opacity: 0; animation-delay: .3s"
          @intersected="onImageAppeared">
          <div ref="_image" class="image">
            <img :src="image" alt="">
          </div>
        </IntersectionContainer>
      </template>

      <template #second-pane>
        <IntersectionContainer once animation-name="slide-in-right" margin="-10px" style="opacity: 0; animation-delay: .6s">
          <div ref="_text" class="text-pane flex-col flex-center">
            <h2 :class="`${url ? 'link' : ''}`" @click="onProjectClick(url)">{{ title }}</h2>
            <p class="text-center" v-html="text"></p>

              <span class="tech-stack-title">{{ landing.portfolio.stack }}</span>

              <div class="brand-card-container flex-row flex-wrap">
                <div class="flex-row brand-card" v-for="key of stack">
                  <img class="tech-icon" :src="brandInfo(key).icon" alt="technology icon">
                  <span class="non-breaking-text">{{ brandInfo(key).name }}</span>
                </div>
              </div>
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
import { onMounted, onBeforeUnmount, nextTick } from 'vue';
import landing from 'assets/copy/en/landing.yml'
import brands from '@/config/brands.yml'
import { preloadImage, navigate } from '@/lib/utils'
import { getAppConfig } from '@/lib/config'

const config = getAppConfig()
let index = $ref(0)
const _text = $ref<HTMLElement>()
const _image = $ref<HTMLElement>()

const image = $computed((): string => landing.portfolio.content[index].image)
const title = $computed((): string => landing.portfolio.content[index].title)
const url = $computed((): string => landing.portfolio.content[index].url)
const text = $computed((): string => landing.portfolio.content[index].text)
const stack = $computed((): string => landing.portfolio.content[index].stack)

interface BrandInfo {
  name: string,
  icon: string
}

const brandInfo = (key: string): BrandInfo => key in brands ? brands[key] : null

const onImageAppeared = () => {
  // only start cycling when image appears for the first time
  restartTimer()
}

let activeIndex = 0
let transitionEnabled = true
let timeoutId: number | null
const transitionIntervalMS = 10000

onMounted(() => {
  for (const item of landing.portfolio.content) {
    preloadImage(`${config.appUrl}${item.image}`)
  }
})

onBeforeUnmount(() => {
  clearTimer()
})

function clearTimer() {
  if (timeoutId) {
    window.clearInterval(timeoutId)
    timeoutId = null
  }
}

function restartTimer() {
  clearTimer()
  timeoutId = window.setInterval(next, transitionIntervalMS)
}

const onPageSelected = (index: number) => {
  if (transitionEnabled && activeIndex !== index) {
    transitionEnabled = false
    activeIndex = index
    doTransition()
  }
}

const onProjectClick = (url?: string) => {
  if (url) {
    navigate(url, true)
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
  _text.style.opacity = '0';
  _image.style.opacity = '0';

  _image.addEventListener('transitionend', () => {
    index = activeIndex
    nextTick(() => {
      _text.style.opacity = '1';
      _image.style.opacity = '1';

      _image.addEventListener('transitionend', () => {
        transitionEnabled = true
        restartTimer()
      }, { once: true })
    })


  }, {once: true})
}
</script>
