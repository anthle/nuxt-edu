<script setup lang="ts">
import type { TestHistoryList } from './types'

const props = defineProps<{
  testHistoryList: TestHistoryList
}>()

const isTestStatus = computed(() => {
  return props.testHistoryList?.answer_status === 0
})
const isScoreStatus = computed(() => {
  return props.testHistoryList.read_status === 0
})
</script>

<template>
  <UiCard>
    <UiCardHeader class="flex justify-between">
      <span>{{ testHistoryList?.testpaper.title }}</span>
      <span :class="!isTestStatus ? 'text-green-500' : 'text-rose-500'">{{ isTestStatus ? '考试中' : '考试完成' }}</span>
    </UiCardHeader>
    <UiCardBody>
      <small class="mr-3">题目总数：{{ testHistoryList?.testpaper.question_count }}</small>
      <small class="mr-3">总分数：{{ testHistoryList.testpaper.total_score }}</small>
      <small>及格分：{{ testHistoryList.testpaper.pass_score }}</small>
    </UiCardBody>
    <UiCardFooter class="flex justify-between items-center">
      <span>{{ testHistoryList.created_time }}</span>
      <div>最终得分：<span :class="isScoreStatus ? 'text-rose-600' : ''">{{ isScoreStatus ? '正在阅卷' : testHistoryList.score }}</span></div>
    </UiCardFooter>
  </UiCard>
</template>
