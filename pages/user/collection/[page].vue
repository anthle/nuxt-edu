<script setup lang="ts">
import { NGi, NGrid, NPagination } from 'naive-ui'
import type { PaginationParams } from '@/composables/types'

useHead({ title: '我的收藏' })

const { page, limit, pending, error, refresh, rows, total, handlePageChange } = await usePagination((params: PaginationParams) => {
  return useUsercollectionApi(params.page)
})

interface type { type: string | undefined;goods_id: number | undefined;success: () => void }
async function cancelCollection({ type, goods_id, success }: type) {
  const { error } = await useToggleCollectionApi('uncollect', {
    type,
    goods_id,
  })
  if (!error.value) {
    success()
    refresh()
  }
}
</script>

<template>
  <div>
    <LoadingGroup :pending="pending" :error="error" :is-empty="rows.length === 0">
      <div class="p-3">
        <NGrid :y-gap="20" :cols="1">
          <NGi v-for="item in rows" :key="item.id">
            <UserCollectionList :collection="item" @cancelCollection="cancelCollection" />
          </NGi>
        </NGrid>
      </div>
      <div class="flex items-center justify-center mt-5 pb-10">
        <NPagination v-model:page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange" />
      </div>
    </LoadingGroup>
  </div>
</template>
