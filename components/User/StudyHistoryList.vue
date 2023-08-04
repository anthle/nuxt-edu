<script setup lang="ts">
import { NButton, NProgress, NTag } from 'naive-ui'
import type { StudyHistoryListType } from './types'

interface StudyHistroyList {
  id: number
  title: string
  cover: string
  type: string
  progress: number
}

const props = defineProps<{
  studyHistoryList: StudyHistroyList
}>()

const route = useRoute()
const tab = route.query.tab

const type: StudyHistoryListType = {
  audio: '音频',
  video: '视频',
  media: '图文',
  column: '专栏',
  book: '电子书',
  course: '课程',
}

function openDetailPage() {
  navigateTo(`/detail/${route.query.tab}/${props.studyHistoryList.id}`)
}
</script>

<template>
  <UiCard>
    <UiCardHeader>
      <span class="mb-2 text-xs text-gray-400">学习进度</span>
      <NProgress type="line" :percentage="studyHistoryList.progress" :show-indicator="false" />
    </UiCardHeader>
    <UiCardBody class="flex justify-center items-center">
      <NTag v-if="tab !== 'column'" size="small">
        {{ type[studyHistoryList.type as keyof StudyHistoryListType] }}
      </NTag>
      <span :class="{ 'ml-3': tab !== 'column' }">{{ studyHistoryList.title }}</span>
      <NButton type="primary" size="tiny" class="ml-auto" @click="openDetailPage">
        继续观看
      </NButton>
    </UiCardBody>
  </UiCard>
</template>
