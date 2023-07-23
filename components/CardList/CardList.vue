<script setup lang="ts">
import { NButton, NGi, NGrid } from 'naive-ui'
import type { CardListData } from './types'

const props = defineProps<{
  cardListData: CardListData
}>()
</script>

<template>
  <div>
    <div class="flex items-center mb-4">
      <span class="text-lg">{{ cardListData.title }}</span>
      <NButton class="ml-auto" quaternary>
        查看更多
      </NButton>
    </div>
    <NGrid x-gap="12" :cols="4">
      <NGi v-for="item in cardListData.data" :key="item.id">
        <CourseList :item-data="item" />
      </NGi>
    </NGrid>
  </div>
</template>
