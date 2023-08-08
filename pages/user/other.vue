<script setup lang="ts">
import { NButton } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()

const user = useUser()

const goToBindPhonePage = () => navigateTo('/bindphone')
</script>

<template>
  <div class="p-5">
    <p class="text-sm text-gray-500">
      其他设置
    </p>
    <div class="flex justify-between items-center py-5 border-b border-solid border-0 border-gray-200">
      手机号:{{ user?.phone }}
      <NButton quaternary type="primary" @click="goToBindPhonePage">
        修改
      </NButton>
    </div>
  </div>
</template>
