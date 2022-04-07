<style scoped>
</style>

<template>
  <h1>{{copy.contact.title}}</h1>
  <p>{{copy.contact.text}}</p>

  <TextInput
    ref="nameField"
    :name="copy.contact.namePlaceholder"
    :validator="validateName"
    :enabled="formFieldEnabled"
  />

  <TextInput
    ref="emailField"
    :name="copy.contact.emailPlaceholder"
    :validator="validateEmail"
    :enabled="formFieldEnabled"
  />

  <TextInput
    ref="messageField"
    :name="copy.contact.messagePlaceholder"
    :max-length="MAX_MESSAGE_LENGTH"
    :validator="validateMessage"
    :enabled="formFieldEnabled"
    multiline
  />

  <Button
    :text="ctaText"
    :enabled="sendEnabled"
    @click="onSendContactRequest"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { sendContactRequest }  from '@/lib/apsis/contact'
import { useEventBus }  from '@/lib/event'
import { trackContactRequest }  from '@/lib/analytics'
import { isValidEmailAddress }  from '@/lib/utils'
import copy from '@/assets/copy/en/app.yml'

useHead({ title: `${copy.contact.title} | ${copy.company}` })

const MAX_MESSAGE_LENGTH = 250

const eventBus = useEventBus()

const nameField = ref()
const emailField = ref()
const messageField = ref()

const isEmailValid = ref(false)
const isNameValid = ref(false)
const isMessageValid = ref(false)
const messageStatus = ref('NOT_SENT')

const sendEnabled = computed(() =>
  isEmailValid.value &&
  isNameValid.value &&
  isMessageValid.value &&
  messageStatus.value === 'NOT_SENT'
)

const formFieldEnabled = computed(() => messageStatus.value === 'NOT_SENT')

const ctaText = computed(() =>
  messageStatus.value === 'NOT_SENT'
  ? copy.contact.cta
  : messageStatus.value === 'SENT'
    ? copy.contact.sent
    : copy.contact.sending
)

const validateEmail = (emailAddress: string) => {
  isEmailValid.value = isValidEmailAddress(emailAddress)
  return isEmailValid.value ? '' : copy.contact.error.invalidEmail
}

const validateName = (name: string) => {
  isNameValid.value = name.length > 0
  return isNameValid.value ? '' : copy.contact.error.invalidName
}

const validateMessage = (message: string) => {
  let msg = ''
  if (message.length === 0 || message === '\n') {
    msg = copy.contact.error.invalidMessage
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    msg = `-${message.length - MAX_MESSAGE_LENGTH}`
  }
  isMessageValid.value = (msg === '')
  return msg
}

const onSendContactRequest = async () => {
  try {
    messageStatus.value = 'SENDING'

    // send contact request
    await sendContactRequest(
      nameField.value.text,
      emailField.value.text,
      messageField.value.text
    )

    // log analytics event
    trackContactRequest()

    // notify success
    eventBus.notify(copy.contact.confirmation, '🎉', 5000)

    messageStatus.value = 'SENT'
  } catch (e) {
    console.error('Failed to send contact request:', e)
    // TODO: notify user
    eventBus.notify(copy.contact.error.failure, '😵')
  }
}
</script>
