<script setup lang="ts">
import { NButton, createDiscreteApi } from 'naive-ui'

const props = defineProps<{
  phone: string
}>()

const time = ref(0)
const timer = ref()
const loading = ref(false)
async function sendCaptcha() {
  loading.value = true

  const { data, error } = await useGetCaptchaApi(props.phone)

  loading.value = false

  if (error.value) return

  time.value = 60
  if (timer.value)clearInterval(timer.value)
  timer.value = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timer.value)
    }
  }, 1000)

  const msg = `你的验证码是${data.value}`
  const { message } = createDiscreteApi(['message'])
  message.success(msg)
}

const text = computed(() => {
  if (loading.value) {
    return '发送中...'
  }
  if (time.value > 0) {
    return `${time.value}s`
  }
  return '获取验证码'
})
</script>

<template>
  <NButton type="primary" :disabled="!phone || time > 0" ghost @click="sendCaptcha">
    {{ text }}
  </NButton>
</template>
