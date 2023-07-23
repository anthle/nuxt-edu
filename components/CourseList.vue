<script setup lang="ts">
import { NCard } from 'naive-ui'
import type { ItemData } from '@/components/CardList/types'

const props = defineProps<{
  itemData: ItemData
}>()
</script>

<template>
  <div class="mb-6">
    <NCard>
      <template #cover>
        <img class="w-full h-[150px]" :src="itemData.cover">
      </template>
      <div class="pt-2">
        <span class="font-semibold truncate w-full">{{ itemData.title }}</span>
      </div>
      <div class="mt-2 flex">
        <Price :price="itemData.price" />
        <Price :price="itemData.t_price" through />
      </div>
    </NCard>
  </div>
</template>
