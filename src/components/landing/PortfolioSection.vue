<style scoped>
.section {
  color: #000;

  padding-top: 3rem;
  padding-bottom: 2rem;
  scroll-snap-align: start;
}

.section-title {
  display: block;
  width: 100%;
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: .14rem;
  line-height: 3rem;
}

.image-pane {
  max-width: 30rem;
  margin: 1rem;
  transition: opacity .2s ease-out;
}

.text-pane {
  max-width: 20rem;
  transition: opacity .2s ease-out;
}

.title {
  display: inline-block;
  text-align: center;
  text-decoration: underline;
  text-decoration-thickness: .08rem;
  text-underline-offset: 0.08rem;
  width: 100%;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  letter-spacing: 0.02rem;
}

@media (--hover) {
  .title {
    cursor: pointer;
  }
}

.text {
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
}

.caption {
  text-align: center;
  font-size: .7rem;
  font-weight: 400;
}

.arrow {
  position: absolute;
  top: 50%;
  stroke: black;
  fill: none;
  height: 2rem;
  opacity: .8;
}

@media (--res-mobile) {
  .arrow {
    height: 1rem;
  }
}

@media (--hover) {
  .arrow:hover {
    cursor: pointer;
  }
}

.left-arrow {
  left: 1%;
}

.right-arrow {
  right: 1%;
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
  <section class="section full-page non-selectable" :style="`background: linear-gradient(${accentColor}, #ddd)`">
    <DualPaneLayout>
      <template #title>
        <span class="section-title">{{ landing.portfolio.title }}</span>
      </template>

      <template #first-pane>
        <div ref="_image" class="image-pane">
          <img :src="image" alt="">
        </div>
      </template>

      <template #second-pane>
        <div ref="_text" class="text-pane">
          <span class="title" @click="navigate(url, true)">{{ title }}</span>
          <p class="text" v-html="text"></p>
          <p class="caption" v-html="caption"></p>
        </div>
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
import landing from '@/assets/copy/en/landing.yml'
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
const accentColor = computed((): string => landing.portfolio.content[index.value].accentColor)

let activeIndex = 0
let transitionEnabled = true
let timeoutId: number
const transitionIntervalMS = 6000

onMounted(() => {
  for (const item of landing.portfolio.content) {
    preloadImage(`${config.appUrl}/${item.image}`)
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
