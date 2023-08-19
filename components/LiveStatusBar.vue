<script setup lang="ts">
import { NAlert } from 'naive-ui'

const props = defineProps<{
  startTime: string
  endTime: string
}>()

const status = computed(() => {
  const { startTime, endTime } = props
  return useTimeStatus(startTime, endTime)
})
</script>

<template>
  <NAlert :show-icon="false" :type="status === 'ing' ? 'success' : 'default'" class="h-[44px] flex items-center justify-center">
    <p class="text-gray-500 text-xs">
      直播时间：{{ startTime }} ~ {{ endTime }}
    </p>
  </NAlert>
</template>
