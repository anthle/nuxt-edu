<script setup lang="ts">
import { NGi, NGrid, NPagination } from 'naive-ui'
import type { PaginationParams } from '@/composables/types'

useHead({ title: '优惠券记录' })

const { page, limit, pending, error, refresh, rows, total, handlePageChange } = await usePagination(({ page, limit }: PaginationParams) => {
  return useUserCouponApi(page)
})
</script>

<template>
  <div>
    <LoadingGroup :pending="pending" :error="error">
      <div class="p-3">
        <NGrid :x-gap="20" :cols="2">
          <NGi v-for="item in rows" :key="item.id">
            <UserCouponUser :coupon="item" />
          </NGi>
        </NGrid>
      </div>
      <div class="flex items-center justify-center mt-5 pb-10">
        <NPagination v-model:page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange" />
      </div>
    </LoadingGroup>
  </div>
</template>
