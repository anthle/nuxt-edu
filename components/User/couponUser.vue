<script setup lang="ts">
import { NButton, NCard } from 'naive-ui'
import type { couponData } from './types'

const props = defineProps<{
  coupon?: couponData
}>()

const isCourse = computed(() => {
  return props.coupon?.title === 'course'
})

const isDateExpired = computed(() => {
  const nowDate = new Date().getTime()
  const couponEndDate = new Date(props.coupon?.end_time as string).getTime()
  return props.coupon?.used ? '已使用' : (nowDate < couponEndDate ? '立即使用' : '已过期')
})

function openCreateOrderPage() {
  const id = props.coupon?.goods_id
  const type = props.coupon?.type
  navigateTo(`/createorder?id=${id}&type=${type}`)
}
</script>

<template>
  <div>
    <NCard class="mb-5 bg-orange-400 rounded-lg" :class="{ 'bg-gray-300': isDateExpired !== '立即使用' }">
      <span class="text-2xl text-white mb-2 font-bold">
        ¥{{ coupon?.price }}
      </span>
      <p class="text-sm text-gray-100">
        适用{{ isCourse ? '课程' : '专栏' }} : {{ coupon?.title }}
      </p>
      <p class="text-sm text-gray-100">
        有效期：{{ coupon?.start_time }} ~ {{ coupon?.end_time }}
      </p>
      <template #footer>
        <div class="flex justify-end">
          <NButton :type="isDateExpired !== '立即使用' ? 'default' : 'warning'" :disabled="isDateExpired !== '立即使用'" @click="openCreateOrderPage">
            {{ isDateExpired }}
          </NButton>
        </div>
      </template>
    </NCard>
  </div>
</template>
