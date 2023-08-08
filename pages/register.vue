<script setup lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import { NButton, NForm, NFormItem, NInput, useMessage } from 'naive-ui'

interface ModelType {
  username: string
  password: string
  repassword: string
}

definePageMeta({
  layout: 'login',
  title: '注册',
  middleware: ['only-visitor'],
})

const title = ref('注册')
useHead({ title })

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()

const formValue = ref<ModelType>({
  username: '',
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
function handleValidateClick() {
  formRef.value?.validate(async (error) => {
    if (!error) {
      const { data, error } = await useRegisterApi(formValue.value)
      if (error.value) return

      message.success('注册成功')
      navigateTo('/login', { replace: true })
    }
  })
}
</script>

<template>
  <NForm ref="formRef" class="w-[340px]" :model="formValue" :rules="rules" size="large">
    <NFormItem path="username" :show-label="false">
      <NInput v-model:value="formValue.username" placeholder="用户名/手机/邮箱" />
    </NFormItem>
    <NFormItem path="password" :show-label="false">
      <NInput v-model:value="formValue.password" show-password-on="click" placeholder="密码" type="password"
        @input="handlePasswordInput" @keydown.enter.prevent />
    </NFormItem>
    <NFormItem ref="rPasswordFormItemRef" first path="repassword" :show-label="false">
      <NInput v-model:value="formValue.repassword" :disabled="!formValue.password" show-password-on="click"
        placeholder="确认密码" type="password" @keyup.enter="handleValidateClick" @keydown.enter.prevent />
    </NFormItem>
    <div class="flex justify-between mb-4 text-green-500">
      <NuxtLink to="/login">
        <NButton type="primary" quaternary size="tiny">
          回到登录
        </NButton>
      </NuxtLink>

      <NButton type="primary" quaternary size="tiny">
        忘记密码
      </NButton>
    </div>
    <div>
      <NButton class="w-full" type="primary" attr-type="button" @click="handleValidateClick">
        注册
      </NButton>
    </div>
    <div class="flex justify-center items-center w-full text-gray-600 mt-5 text-xs">
      注册即同意
      <NButton quaternary type="primary" size="tiny">
        《服务协议》
      </NButton>
      和
      <NButton quaternary type="primary" size="tiny">
        《隐私政策》
      </NButton>
    </div>
  </NForm>
</template>
