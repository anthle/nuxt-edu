<script setup lang="ts">
import { NPagination } from 'naive-ui'
import type { PaginationParams } from '@/composables/types'

useHead({ title: '考试记录' })

const { page, limit, pending, error, refresh, rows, total, handlePageChange } = await usePagination(({ page, limit }: PaginationParams) => {
  return useUserTestHistoryApi(page)
})
</script>

<template>
  <div>
    <LoadingGroup :pending="pending" :error="error" :is-empty="rows.length === 0">
      <div class="p-3">
        <UserTestHistroyList v-for="item in rows" :key="item.id" :test-history-list="item" />
      </div>
      <div class="flex items-center justify-center mt-5 pb-10">
        <NPagination v-model:page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange" />
      </div>
    </LoadingGroup>
  </div>
</template>
