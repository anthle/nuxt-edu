<script setup lang="ts">
import { NCard, NGi, NGrid } from 'naive-ui'
import type { ImageData } from './types'

const props = defineProps<{
  imageData: ImageData[]
}>()

function open(item: ImageData) {
  if (item.type === 'webview')
    window.open(item.url)
}
</script>

<template>
  <div>
    <NGrid class="mb-6" x-gap="12" :cols="4">
      <NGi v-for="item in imageData" :key="item.name">
        <NCard class="cursor-pointer" @click="open(item)">
          <template #cover>
            <img class="w-full h-[90px]" :src="item.src">
          </template>
          <div class="text-center pt-4">
            {{ item.name }}
          </div>
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>
