<script setup lang="ts">
import { NPagination } from 'naive-ui'

const route = useRoute()
useHead({ title: '学习记录' })

const tab = [
  {
    label: '课程',
    value: 'course',
  },
  {
    label: '专栏',
    value: 'column',
  },
]
const type = ref(route.query.tab || 'course')
function handleChangeType(value: string) {
  navigateTo({
    params: {
      ...route.params,
      page: 1,
    },
    query: {
      ...route.query,
      tab: value,
    },
  })
}

interface PaginationParams { page: number; limit: number }

const { page, limit, pending, error, refresh, rows, total, handlePageChange } = await usePagination(({ page, limit }: PaginationParams) => {
  return useUserHistoryApi(() => {
    return {
      page,
      type: type.value as string,
    }
  })
})
</script>

<template>
  <div>
    <UiTab>
      <UiTabItem v-for="item in tab" :key="item.value" :active="type === item.value" @click="handleChangeType(item.value)">
        {{ item.label }}
      </UiTabItem>
    </UiTab>

    <LoadingGroup :pending="pending" :error="error" :is-empty="rows.length === 0" class="mt-5">
      <!-- NPagination可选择是否置于底部 -->
      <div class="min-h-[74vh] flex flex-col justify-between">
        <div class="px-3">
          <UserStudyHistoryList v-for="item in rows" :key="item.id" :study-history-list="item" />
        </div>
        <div class="flex items-center justify-center mt-5 pb-10">
          <NPagination v-model:page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange" />
        </div>
      </div>
    </LoadingGroup>
  </div>
</template>
