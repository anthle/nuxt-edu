<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { NButton, NForm, NFormItem, NInput, NInputGroup, createDiscreteApi } from 'naive-ui'

definePageMeta({
  layout: 'login',
  title: '绑定手机号',
})

useHead({
  title: '绑定手机号',
})
const route = useRoute()

const formRef = ref<FormInst | null>(null)
const formValue = ref({
  phone: '',
  captcha: '',
})
const rules = {
  username: {
    required: true,
    message: '请输入手机号',
  },
  captcha: {
    required: true,
    message: '请输入验证码',
  },
}

const loading = ref(false)
const hasFrom = computed(() => route.query.from || '/')
function handleValidateClick() {
  formRef.value?.validate(async (error) => {
    if (!error) {
      loading.value = true
      const { data, error } = await usebindMobileApi(formValue.value)
      loading.value = false
      if (error.value) return

      const { message } = createDiscreteApi(['message'])
      message.success('绑定成功')

      setTimeout(() => {
        navigateTo(`${hasFrom.value}`, { replace: true })
      }, 500)
    }
  })
}
</script>

<template>
  <NForm
    ref="formRef"
    class="w-[340px]"
    :model="formValue"
    :rules="rules"
    size="large"
  >
    <NFormItem path="phone" :show-label="false">
      <NInput v-model:value="formValue.phone" placeholder="手机号" />
    </NFormItem>
    <NFormItem path="captcha" :show-label="false">
      <NInputGroup>
        <NInput v-model:value="formValue.captcha" :style="{ width: '75%' }" placeholder="验证码" />
        <SendCaptcha class="min-w-[111px]" :phone="formValue.phone" />
      </NInputGroup>
    </NFormItem>

    <div>
      <NButton class="w-full" type="primary" attr-type="button" :loading="loading" @click="handleValidateClick">
        绑 定
      </NButton>
    </div>
  </NForm>
</template>
