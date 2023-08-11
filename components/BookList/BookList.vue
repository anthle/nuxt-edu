<script setup lang="ts">
import { NButton, NImage } from 'naive-ui'
import type { BookData } from './types'

const props = defineProps<{
  bookData: BookData
}>()

const btnText = computed(() => {
  return props.bookData?.sub_count !== 0 ? `${props.bookData.sub_count}人订阅` : '立即订阅'
})

function toDetailPage() {
  const id = props.bookData.id
  navigateTo(`/detail/book/${id}`)
}
</script>

<template>
  <section class="shadow flex bg-white rounded mb-5 p-5">
    <NImage :src="bookData?.cover" width="108" height="138" />
    <div class="flex flex-col flex-1 pl-5">
      <div>{{ bookData?.title }}</div>
      <div class="mt-auto flex items-center">
        <Price :price="bookData?.price" />
        <Price :price="bookData?.t_price" through />
        <NButton class="ml-auto" strong secondary type="primary" round @click="toDetailPage">
          {{ btnText }}
        </NButton>
      </div>
    </div>
  </section>
</template>
