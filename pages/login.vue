<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { NButton, NForm, NFormItem, NInput, useMessage } from 'naive-ui'

definePageMeta({
  layout: 'login',
})

useHead({
  title: '登录',
})

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formValue = ref({
  username: '',
  password: '',
})
const rules = {
  username: {
    required: true,
    message: '请输入用户名/手机/邮箱',
  },
  password: {
    required: true,
    message: '请输入密码',
  },
}

function handleValidateClick() {
  formRef.value?.validate((error) => {
    if (!error) {
      message.success('注册成功')
    }
    else {
      console.log(error)
      // message.error('注册失败')
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
    <NFormItem path="username" :show-label="false">
      <NInput v-model:value="formValue.username" placeholder="用户名/手机/邮箱" />
    </NFormItem>
    <NFormItem path="password" :show-label="false">
      <NInput v-model:value="formValue.password" show-password-on="click" placeholder="密码" type="password" />
    </NFormItem>
    <div class="flex justify-between mb-4 text-green-500">
      <NuxtLink to="/register">
        <NButton type="primary" quaternary size="tiny">
          注册
        </NButton>
      </NuxtLink>
      <NButton type="primary" quaternary size="tiny">
        忘记密码
      </NButton>
    </div>
    <div>
      <NButton class="w-full" type="primary" attr-type="button" @click="handleValidateClick">
        登录
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
