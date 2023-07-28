<script setup lang="ts">
import { NGi, NGrid, NPagination } from 'naive-ui'

definePageMeta({
  middleware: ['search'],
})
const route = useRoute()
const title = ref(route.query.keyword)
useHead({ title: title.value as string })

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
const type = ref(route.params.type)
function handleChangeType(value: string) {
  navigateTo({
    params: {
      ...route.params,
      type: value,
    },
    query: {
      ...route.query,
    },
  })
}

interface PaginationParams { page: number; limit: number }

const { page, limit, pending, error, refresh, rows, total, handlePageChange } = await usePagination((params: PaginationParams) => {
  return useSearchDataApi(() => {
    return {
      page: params.page,
      keyword: encodeURIComponent(title.value as string),
      type: type.value,
    }
  })
})

watch(() => route.query.keyword, (newVal) => {
  title.value = newVal
  refresh()
})
</script>

<template>
  <div>
    <h5 class="text-lg my-3">
      "{{ title }}"的搜索相关结果
    </h5>

    <UiTab>
      <UiTabItem v-for="item in tab" :key="item.value" :active="type === item.value" @click="handleChangeType(item.value)">
        {{ item.label }}
      </UiTabItem>
    </UiTab>

    <LoadingGroup :pending="pending" :error="error" class="mt-5">
      <template #loading>
        <LoadingCourseSkeleton />
      </template>
      <NGrid x-gap="12" :cols="4">
        <NGi v-for="item in rows" :key="item.id">
          <CourseList :recommend-or-latest-item-data="item" />
        </NGi>
      </NGrid>
      <div class="flex items-center justify-center mt-5 mb-10">
        <NPagination v-model:page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange" />
      </div>
    </LoadingGroup>
  </div>
</template>
