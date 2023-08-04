<script setup lang="ts">
import { NButton } from 'naive-ui'
import type { PurchaseHistoryListStatus, PurchaseHistoryListType } from './types'

interface PurchaseHistoryList {
  id: number
  no: string
  price: string
  status: string
  total_price: string
  created_time: string
  type: string
  goods: string
}
const props = defineProps<{
  purchaseHistoryList: PurchaseHistoryList
}>()

const status: PurchaseHistoryListStatus = {
  closed: '已关闭',
  success: '支付成功',
  pendding: '等待支付',
  grouping: '拼团中',
}
const type: PurchaseHistoryListType = {
  group: '拼团',
  flashsale: '秒杀',
}

function toPay() {
  navigateTo(`/pay?no=${props.purchaseHistoryList.no}`)
}
</script>

<template>
  <UiCard>
    <UiCardHeader class="flex justify-between">
      <span>订单时间: {{ purchaseHistoryList?.created_time }}</span>
      <span>订单号: {{ purchaseHistoryList?.no }}</span>
    </UiCardHeader>
    <UiCardBody>{{ purchaseHistoryList?.goods }}</UiCardBody>
    <UiCardFooter class="flex justify-start items-center">
      <span v-if="purchaseHistoryList.type !== 'default'">[{{ type[purchaseHistoryList.type as keyof PurchaseHistoryListType] }}]</span>
      <Price price="10" />
      <span class="ml-auto" :class="{ 'text-green-600': (purchaseHistoryList.status === 'success') }">
        {{ status[purchaseHistoryList.status as keyof PurchaseHistoryListStatus] }}
      </span>
      <NButton v-if="purchaseHistoryList.status === 'pendding'" class="ml-2" type="primary" size="small" @click="toPay()">
        立即支付
      </NButton>
    </UiCardFooter>
  </UiCard>
</template>
