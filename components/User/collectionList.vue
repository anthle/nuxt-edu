<script setup lang="ts">
import { NButton, NImage, NTag, createDiscreteApi } from 'naive-ui'
import type { collectionData } from './types'

const props = defineProps<{
  collection?: collectionData
}>()

const emit = defineEmits(['cancelCollection'])

const isCourse = computed(() => {
  return props.collection?.type === 'course'
})

function cancelCollection() {
  const type = props.collection?.type
  const goods_id = props.collection?.goods.id

  const { dialog, message } = createDiscreteApi(['dialog', 'message'])
  dialog.warning({
    content: '是否要取消该收藏？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      emit('cancelCollection', {
        type,
        goods_id,
        success() {
          message.success('取消收藏成功')
        },
      })
    },
  })
}

function goToDetailPage() {
  const type = props.collection?.type
  const goods_id = props.collection?.goods.id
  navigateTo(`/detail?${type}/${goods_id}`)
}
</script>

<template>
  <div class="p-3 border border-gray-300 border-solid flex justify-between items-center">
    <div class="flex items-center">
      <NTag type="info" size="small" class="rounded mr-2">
        {{ isCourse ? '课程' : '专栏' }}
      </NTag>
      <NImage class="rounded mr-2" :src="collection?.goods.cover" width="40" />
      <span class="text-sm text-gray-500">{{ collection?.goods.title }}</span>
    </div>
    <div>
      <NButton type="primary" size="tiny" class="mr-2" @click="goToDetailPage">
        查看
      </NButton>
      <NButton type="error" size="tiny" @click="cancelCollection">
        删除
      </NButton>
    </div>
  </div>
</template>
