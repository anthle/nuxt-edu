<script setup lang="ts">
import { NButton, NPopover, NScrollbar } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()

const { data } = await useGetCouponDataApi(1)
</script>

<template>
  <div>
    <NPopover trigger="click" placement="right">
      <template #trigger>
        <NButton type="warning" strong secondary size="tiny">
          领取优惠券
        </NButton>
      </template>
      <div class="p-2">
        <span class="text-xl">可用优惠券({{ data.length }})</span>
        <NScrollbar class="mt-2" style="max-height: 300px">
          <CouponList v-for="item in data" :key="item.id" :coupon="item" />
        </nscrollbar>
      </div>
    </NPopover>
  </div>
</template>
