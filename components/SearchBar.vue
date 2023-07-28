<script setup lang="ts">
import { NButton, NDrawer, NInput, NInputGroup } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()

const active = ref(false)
const keyword = ref()

function open() {
  active.value = true
}

function close() {
  keyword.value = ''
  active.value = false
}

function handleSearch() {
  setTimeout(() => close(), 100)
  navigateTo({
    name: 'search-type-page',
    params: {
      type: 'course',
      page: 1,
    },
    query: {
      keyword: keyword.value,
    },
  })
}

defineExpose({
  open,
})
</script>

<template>
  <div>
    <NDrawer
      v-model:show="active"
      :default-width="502"
      placement="top"
      resizable
    >
      <div class="flex items-center justify-center h-full">
        <NInputGroup class="flex items-center justify-center">
          <NInput v-model:value="keyword" size="large" :style="{ width: '50%' }" placeholder="请输入关键词..." @keyup.enter="handleSearch" />
          <NButton size="large" type="primary" ghost :disabled="!keyword" @click="handleSearch">
            搜索
          </NButton>
        </NInputGroup>
      </div>
    </NDrawer>
  </div>
</template>
