<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NGi, NGrid, NPagination } from 'naive-ui'
import type { PaginationParams } from '@/composables/types'

definePageMeta({
  middleware: ['list'],
})

const route = useRoute()
const title = route.meta.title
const type = route.params.type

const { page, limit, pending, error, refresh, rows, total, handlePageChange } = await usePagination(({ page, limit }: PaginationParams) => {
  return useContentListDataApi(route.params.type as 'column' | 'course' | 'book', page)
})
</script>

<template>
  <div>
    <div>
      <NBreadcrumb>
        <NBreadcrumbItem>
          <NuxtLink to="/">
            首页
          </NuxtLink>
        </NBreadcrumbItem>
        <NBreadcrumbItem>
          {{ title }}
        </NBreadcrumbItem>
      </NBreadcrumb>
    </div>
    <LoadingGroup :pending="pending" :error="error" :is-empty="rows.length === 0" class="mt-5">
      <template #loading>
        <LoadingBookSkeleton v-if="type === 'book'" />
        <LoadingCourseSkeleton v-else />
      </template>
      <NGrid x-gap="12" :cols="type === 'book' ? 2 : 4">
        <NGi v-for="item in rows" :key="item.id">
          <BookList v-if="type === 'book'" :book-data="item" />
          <CourseList v-else :recommend-or-latest-item-data="item" />
        </NGi>
      </NGrid>
      <div class="flex items-center justify-center mt-5 mb-10">
        <NPagination v-model:page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange" />
      </div>
    </LoadingGroup>
  </div>
</template>
