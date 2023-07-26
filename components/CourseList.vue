<script setup lang="ts">
import { NCard } from 'naive-ui'
import type { GroupItemData, ItemData } from '@/components/CardList/types'

const props = defineProps<{
  itemData?: ItemData
  groupItemData?: GroupItemData
  pending?: boolean
}>()
</script>

<template>
  <div class="mb-6">
    <template v-if="itemData">
      <NCard class=" cursor-pointer shadow-md !border-0 rounded" footer-style="padding:0">
        <template #cover>
          <img class="w-full h-[150px]" :src="itemData.cover">
        </template>
        <div class="pt-2">
          <span class="font-semibold truncate w-full">{{ itemData.title }}</span>
        </div>
        <div class="mt-2 flex">
          <Price :price="itemData.price" />
          <Price :price="itemData.t_price" through />
        </div>
      </NCard>
    </template>
    <template v-if="groupItemData">
      <NCard class=" cursor-pointer shadow-md !border-0 rounded" footer-style="padding:0">
        <template #cover>
          <img class="w-full h-[150px]" :src="groupItemData.cover">
        </template>
        <div class="pt-2">
          <span class="font-semibold truncate w-full">{{ groupItemData.title }}</span>
        </div>
        <div class="mt-2 flex">
          <Price :price="groupItemData.price" />
          <Price :price="groupItemData.t_price" through />
        </div>
        <template #footer>
          <div class="bg-amber-500 text-white text-xs p-3 flex items-center">
            {{ groupItemData.group_id ? '拼团中' : "秒杀中" }}
            <div class="ml-auto flex items-center">
              倒计时
              <CountDown :time="groupItemData.end_time" />
            </div>
          </div>
        </template>
      </NCard>
    </template>
  </div>
</template>
