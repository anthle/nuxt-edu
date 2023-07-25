<script setup lang="ts">
import { NButton, NGi, NGrid } from 'naive-ui'
import type { CardListData } from './types'

interface Props {
  cardListData: CardListData
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'course',
})

const isGroup = ref(false)
// const pData = ref(props.cardListData.data || [])
const pData = ref()
if (props.type === 'group') {
  isGroup.value = true
  const { data } = await useFetch('/group/list?page=1&usable=1', {
    key: 'groupData',
    headers: {
      appid: 'bd9d01ecc75dbbaaefce',
    },
    baseURL: 'http://demonuxtapi.dishait.cn/pc',
    transform: (res: any) => {
      return res.data
    },
  })
  pData.value = data.value.rows
}
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
      <template v-if="!isGroup">
        <NGi v-for="item in cardListData.data" :key="item.id">
          <CourseList :item-data="item" />
        </NGi>
      </template>
      <template v-else>
        <NGi v-for="item in pData" :key="item.id">
          <CourseList :group-item-data="item" />
        </NGi>
      </template>
    </NGrid>
  </div>
</template>
