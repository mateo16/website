<template>
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
    ref="companyField"
    :name="copy.contact.companyPlaceholder"
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
    small
  />
</template>

<script setup lang="ts">
import { sendContactRequest }  from '@/lib/apsis/contact'
import { useEventBus }  from '@/lib/event'
import { trackContactRequest }  from '@/lib/analytics'
import { isValidEmailAddress }  from '@/lib/utils'
import TextInput from '@/components/TextInput.vue'
import copy from 'assets/copy/en/app.yml'

const MAX_MESSAGE_LENGTH = 250

const eventBus = useEventBus()

const nameField = $ref<InstanceType<typeof TextInput>>()
const emailField = $ref<InstanceType<typeof TextInput>>()
const companyField = $ref<InstanceType<typeof TextInput>>()
const messageField = $ref<InstanceType<typeof TextInput>>()

let isEmailValid = $ref(false)
let isNameValid = $ref(false)
let isMessageValid = $ref(false)
let messageStatus = $ref('NOT_SENT')

const sendEnabled = $computed(() =>
  isEmailValid &&
  isNameValid &&
  isMessageValid &&
  messageStatus === 'NOT_SENT'
)

const formFieldEnabled = $computed(() => messageStatus === 'NOT_SENT')

const ctaText = $computed(() =>
  messageStatus === 'NOT_SENT'
  ? copy.contact.cta
  : messageStatus === 'SENT'
    ? copy.contact.sent
    : copy.contact.sending
)

const validateName = (name: string) => {
  isNameValid = name.trim().length > 0
  return isNameValid ? '' : copy.contact.error.invalidName
}

const validateEmail = (emailAddress: string) => {
  isEmailValid = isValidEmailAddress(emailAddress)
  return isEmailValid ? '' : copy.contact.error.invalidEmail
}

const validateMessage = (message: string) => {
  let msg = ''
  if (message.length === 0 || message === '\n') {
    msg = copy.contact.error.invalidMessage
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    msg = `-${message.length - MAX_MESSAGE_LENGTH}`
  }
  isMessageValid = (msg === '')
  return msg
}

const onSendContactRequest = async () => {
  try {
    messageStatus = 'SENDING'

    // send contact request
    await sendContactRequest(
      nameField.getText(),
      emailField.getText(),
      companyField.getText(),
      messageField.getText()
    )

    // log analytics event
    trackContactRequest()

    // notify success
    eventBus.notify(copy.contact.confirmation, '🎉', 5000)

    messageStatus = 'SENT'
  } catch (e) {
    console.error('Failed to send contact request:', e)
    // notify user
    eventBus.notify(copy.contact.error.failure, '😵')
  }
}
</script>
