<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NRadio, NRadioGroup, NSpace, createDiscreteApi } from 'naive-ui'
import type { FormInst } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()

const user = useUser()

const formRef = ref<FormInst | null>(null)
const formValue = ref({
  avatar: '',
  nickname: '',
  sex: '',
})

if (user.value) {
  formValue.value.avatar = user.value.avatar
  formValue.value.nickname = user.value.nickname
  formValue.value.sex = user.value.sex
}

const rules = {
  nickname: {
    required: true,
    message: '昵称不能为空',
    trigger: 'blur',
  },
  sex: {
    required: true,
    message: '性别不能为空',
    trigger: 'blur',
  },
}

const sexOptions = [
  {
    value: '未知',
  },
  {
    value: '男',
  },
  {
    value: '女',
  },
]

const loading = ref(false)

function onsubmit() {
  formRef.value?.validate(async (error) => {
    if (!error) {
      loading.value = true

      const { data, error } = await useUpdateUserInfoApi({
        ...formValue.value,
        sex: formValue.value.sex as '男' | '女' | '未知',
      })

      loading.value = false

      if (error.value) return
      const { message } = createDiscreteApi(['message'])
      message.success('修改成功')
      // 刷新用户信息
      useRefreshUserInfo()
    }
  })
}

function clearForm() {
  formValue.value = {
    avatar: '',
    nickname: '',
    sex: '',
  }
}
</script>

<template>
  <div class="p-5">
    <NForm
      ref="formRef"
      :model="formValue"
      :rules="rules"
      label-width="80"
      label-placement="left"
    >
      <NFormItem label="用户名">
        <NInput v-model:value="user!.username" placeholder="用户名" disabled />
      </NFormItem>
      <NFormItem path="avatar" label="头像">
        <Upload v-model="formValue.avatar" />
      </NFormItem>
      <NFormItem path="nickname" label="昵称">
        <NInput v-model:value="formValue.nickname" :style="{ width: '75%' }" placeholder="请输入昵称" />
      </NFormItem>
      <NFormItem path="sex" label="性别">
        <NRadioGroup v-model:value="formValue.sex" name="sex">
          <NSpace>
            <NRadio
              v-for="item in sexOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.value }}
            </NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>

      <div class="flex justify-end items-center">
        <NButton class="mr-3" type="primary" attr-type="button" :loading="loading" @click="onsubmit">
          提交修改
        </NButton>
        <NButton type="info" attr-type="button" @click="clearForm">
          重置
        </NButton>
      </div>
    </NForm>
  </div>
</template>
