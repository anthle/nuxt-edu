<script setup lang="ts">
import { NButton, createDiscreteApi } from 'naive-ui'

const props = defineProps<{
  isCollection?: boolean
  goods_id: number
  contentType: string
}>()

const isCollection = ref(props.isCollection)

const loading = ref(false)

function toggleCollectionStatus() {
  loading.value = true
  useHasAuth(async () => {
    const paramsType = isCollection.value ? 'uncollect' : 'collect'
    const { error } = await useToggleCollectionApi(paramsType, {
      goods_id: props.goods_id,
      type: props.contentType,
    })

    if (error.value) return

    isCollection.value = !isCollection.value
    loading.value = false
    const { message } = createDiscreteApi(['message'])
    message.success(`${isCollection.value ? '收藏' : '取消收藏'}成功`)
  })
}
</script>

<template>
  <div class="flex items-center">
    <NButton size="tiny" strong secondary :type="isCollection ? 'primary' : 'default'" :loading="loading" @click="toggleCollectionStatus">
      {{ isCollection ? '已收藏' : '收藏' }}
    </NButton>
  </div>
</template>
