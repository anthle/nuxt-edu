<script setup lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import { NButton, NForm, NFormItem, NInput, NInputGroup, useMessage } from 'naive-ui'

interface ModelType {
  phone: string
  captcha: string
  password: string
  repassword: string
}

definePageMeta({
  layout: 'login',
  title: '重置密码',
  middleware: ['only-visitor'],
})

const router = useRouter()
const title = ref('重置密码')
useHead({ title })

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()

const formValue = ref<ModelType>({
  phone: '',
  captcha: '',
  password: '',
  repassword: '',
})

const rules: FormRules = {
  username: {
    required: true,
    message: '用户名/手机/邮箱必填',
  },
  password: {
    required: true,
    message: '请输入密码',
  },
  repassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur',
    },
    {
      required: true,
      message: '两次密码输入不一致',
      validator: validatePasswordStartWith,
      trigger: 'input',
    },
    {
      required: true,
      message: '两次密码输入不一致',
      validator: validatePasswordSame,
      trigger: ['blur', 'password-input'],
    },
  ],
}

function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return !!formValue.value.password
        && formValue.value.password.startsWith(value)
        && formValue.value.password.length >= value.length
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === formValue.value.password
}

function handlePasswordInput() {
  if (formValue.value.repassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}

const loading = ref(false)
function handleValidateClick() {
  formRef.value?.validate(async (error) => {
    if (!error) {
      loading.value = true

      const { data, error } = await useForgotApi(formValue.value)

      loading.value = false

      if (error.value) return

      message.success('重置密码成功')

      router.go(-1)
    }
  })
}
</script>

<template>
  <NForm ref="formRef" class="w-[340px]" :model="formValue" :rules="rules" size="large">
    <NFormItem path="phone" :show-label="false">
      <NInput v-model:value="formValue.phone" placeholder="手机号" />
    </NFormItem>
    <NFormItem path="captcha" :show-label="false">
      <NInputGroup>
        <NInput v-model:value="formValue.captcha" :style="{ width: '75%' }" placeholder="验证码" />
        <SendCaptcha class="min-w-[111px]" :phone="formValue.phone" />
      </NInputGroup>
    </NFormItem>

    <NFormItem path="password" :show-label="false">
      <NInput v-model:value="formValue.password" show-password-on="click" placeholder="密码" type="password" @input="handlePasswordInput" @keydown.enter.prevent />
    </NFormItem>
    <NFormItem ref="rPasswordFormItemRef" first path="repassword" :show-label="false">
      <NInput v-model:value="formValue.repassword" :disabled="!formValue.password" show-password-on="click" placeholder="确认密码" type="password" @keyup.enter="handleValidateClick" @keydown.enter.prevent />
    </NFormItem>
    <div class="flex justify-between mb-4 text-green-500">
      <NuxtLink to="/login">
        <NButton type="primary" quaternary size="tiny">
          回到登录
        </NButton>
      </NuxtLink>
    </div>
    <div>
      <NButton class="w-full" type="primary" attr-type="button" @click="handleValidateClick">
        重置密码
      </NButton>
    </div>
  </NForm>
</template>
