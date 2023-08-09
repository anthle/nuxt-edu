<script setup lang="ts">
import type { AnyObject } from 'globalTypes'
import { NTag } from 'naive-ui'
import type { MenuData } from './types'

const props = defineProps<{
  menuData: MenuData
  index: number
}>()

const typeMap: AnyObject = {
  media: '图文',
  audio: '音频',
  video: '视频',
}

const price = computed(() => Number.parseInt(props.menuData.price))
</script>

<template>
  <li class="flex p-5 hover:bg-gray-100 border-0 border-solid border-gray-200 border-b cursor-pointer text-sm">
    <NTag type="info" size="small" :bordered="false">
      {{ typeMap[menuData.type as keyof AnyObject] }}
    </NTag>
    <div class="ml-2">
      <span>章节{{ index }}.</span>
      <span class="ml-2">{{ menuData.title }}</span>
    </div>
    <div class="ml-auto">
      <NTag v-if="price === 0" type="success" :bordered="false" size="small">
        免费
      </NTag>
    </div>
  </li>
</template>
