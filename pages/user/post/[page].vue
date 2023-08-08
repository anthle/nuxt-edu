<script setup lang="ts">
import { NPagination } from 'naive-ui'
import type { PaginationParams } from '@/composables/types'

interface HandleDeletePostFn {
  (params: {
    id: number
    success: () => void
  }): void
}

useHead({ title: '我的帖子' })

const { page, limit, pending, error, refresh, rows, total, handlePageChange } = await usePagination(({ page, limit }: PaginationParams) => {
  return useUserPostApi(page)
})

const handleDeletePost: HandleDeletePostFn = async ({ id, success }) => {
  const { error } = await useDeletePostApi(id)
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
        <UserMyPostList v-for="item in rows" :key="item.id" :my-post-list="item" @deletePost="handleDeletePost" />
      </div>
      <div class="flex items-center justify-center mt-5 pb-10">
        <NPagination v-model:page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange" />
      </div>
    </LoadingGroup>
  </div>
</template>
