<style scoped>
.notification-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .6rem;
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
    empty
    background-color="var(--callout-color)"
    top
    :timeout="_timeout"
    :show="_show"
    dim
    @close="_show = false"
  >
    <div class="notification-container">
      <span class="badge">{{ _badge }}</span>
      <span>{{ _text }}</span>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Events } from '@/lib/event'
import { useApplicationEventListener } from '@/lib/composable/event'
import { nextTick } from 'vue'
import Dialog from '@/components/Dialog.vue'

const DEFAULT_TIMEOUT = 3000;

const dialog: InstanceType<typeof Dialog> = $ref()
let _text = $ref('')
let _badge = $ref('')
let _timeout = $ref(DEFAULT_TIMEOUT)
let _show = $ref(false)

const onNotify = (e: CustomEvent) => { notify(e.detail.text, e.detail.badge, e.detail.timeout) }

useApplicationEventListener(Events.NOTIFICATION, onNotify)

const notify = (text: string, badge?: string, timeout?: number) => {
  _text = text
  _badge = badge || ''
  _timeout = timeout === undefined ? DEFAULT_TIMEOUT : timeout
  _show = true

  nextTick(() => { dialog.show() })
}

defineExpose({
  notify
})
</script>
