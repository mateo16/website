<style scoped>
.notification-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .6rem;
}

.notification-text {
  display: inline;
  width: 100%;
  color: var(--text-color);
  text-align: center;
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: 600;
  line-height: 1.6rem;
  letter-spacing: 0.06em;
  white-space: pre-wrap;
}

.badge {
  left: 0;
  height: 2rem;
  min-width: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}
</style>

<template>
  <Dialog
    ref="dialog"
    width="var(--dialog-width)"
    empty
    background-color="var(--background-color)"
    top
    :timeout="_timeout"
    :show="_show"
    :dim="false"
    @close="_show = false"
  >
    <div class="notification-container">
      <span class="badge">{{ _badge }}</span>
      <span class="notification-text">{{ _text }}</span>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog.vue';
import { useEventBus, Events } from '@/lib/event'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const DEFAULT_TIMEOUT = 3000;

const eventBus = useEventBus()

const dialog = ref()
const _text = ref('')
const _badge = ref('')
const _timeout = ref(DEFAULT_TIMEOUT)
const _show = ref(false)

const onNotify = (e: CustomEvent) => {
  notify(e.detail.text, e.detail.badge, e.detail.timeout)
}

onMounted(() => {
  eventBus.on(Events.NOTIFICATION, onNotify)
})

onBeforeUnmount(() => {
  eventBus.off(Events.NOTIFICATION, onNotify)
})

const notify = (text: string, badge?: string, timeout?: number) => {
  _text.value = text
  _badge.value = badge || ''
  _timeout.value = timeout === undefined ? DEFAULT_TIMEOUT : timeout
  _show.value = true

  nextTick(() => { dialog.value.show() })
}

defineExpose({
  notify
})
</script>
