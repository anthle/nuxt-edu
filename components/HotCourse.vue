<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()

const { data } = await useGetHotCourseDataApi()
</script>

<template>
  <div class="bg-white shadow rounded mb-5">
    <div class="p-3 border-solid border-gray-200 border-0 border-b">
      <span>精品推荐</span>
    </div>
    <div class="p-3">
      <CourseList v-for="item in data" :key="item.id" :recommend-or-latest-item-data="item" />
    </div>
  </div>
</template>
