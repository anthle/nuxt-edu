<script setup lang="ts">
import type { ImageAdData } from './types'

const props = defineProps<{
  imageAdData: ImageAdData[]
}>()

function open(item: ImageAdData) {
  if (item.type === 'course')
    navigateTo(`/detail/cursor/${item.course_id}`)
}
</script>

<template>
  <div>
    <img v-for="item in imageAdData" :key="item.course_id" class="w-full h-[100px] cursor-pointer mb-6" :src="item.src" @click="open(item)">
  </div>
</template>
