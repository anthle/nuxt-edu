<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, createDiscreteApi } from 'naive-ui'
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'

interface ModelType {
  originalPassword: string
  password: string
  repassword: string
}

const props = defineProps<{
  modelValue?: boolean
}>()

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)

const formValue = ref<ModelType>({
  originalPassword: '',
  password: '',
  repassword: '',
})

const rules: FormRules = {
  originalPassword: {
    required: true,
    message: '原密码必填',
  },
  password: {
    required: true,
    message: '请输入新密码',
  },
  repassword: [
    {
      required: true,
      message: '请再次输入新密码',
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
      const { data, error } = await useUpdatePasswordApi({
        ...formValue.value,
        opassword: formValue.value.originalPassword,
      })
      if (error.value) return

      await useLogout()
      const { message } = createDiscreteApi(['message'])
      message.success('修改密码成功')
    }
  })
}

function clearForm() {
  formValue.value = {
    originalPassword: '',
    password: '',
    repassword: '',
  }
}
</script>

<template>
  <div class="p-5">
    <NForm ref="formRef" :model="formValue" :rules="rules" label-width="80" label-placement="left">
      <NFormItem label="原密码">
        <NInput v-model:value="formValue.originalPassword" placeholder="输入原密码" />
      </NFormItem>
      <NFormItem path="password" label="新密码">
        <NInput
          v-model:value="formValue.password" show-password-on="click" placeholder="密码" type="password"
          @input="handlePasswordInput" @keydown.enter.prevent
        />
      </NFormItem>
      <NFormItem ref="rPasswordFormItemRef" first path="repassword" label="确认密码">
        <NInput
          v-model:value="formValue.repassword" :disabled="!formValue.password" show-password-on="click"
          placeholder="确认密码" type="password" @keyup.enter="handleValidateClick" @keydown.enter.prevent
        />
      </NFormItem>

      <div class="flex justify-end items-center">
        <NButton class="mr-3" type="primary" attr-type="button" @click="handleValidateClick">
          提交修改
        </NButton>
        <NButton type="info" attr-type="button" @click="clearForm">
          重置
        </NButton>
      </div>
    </NForm>
  </div>
</template>
