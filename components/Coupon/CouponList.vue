<script setup lang="ts">
import { NButton, NCard, NTime, createDiscreteApi } from 'naive-ui'
import type { Coupon } from './types'

const props = defineProps<{
  coupon: Coupon
}>()
const loading = ref(false)

const isCourse = computed(() => {
  return props.coupon?.type === 'course'
})

function openCreateOrderPage() {
  const id = props.coupon?.goods_id
  const type = props.coupon?.type
  navigateTo(`/createorder?id=${id}&type=${type}`)
}

const isCouponReceived = ref(props.coupon.isgetcoupon)

function getCoupons() {
  const { message } = createDiscreteApi(['message'])
  if (isCouponReceived.value) {
    message.error('您已经领取过了')
  }
  else {
    useHasAuth(async () => {
      loading.value = true
      const { error } = await useGetCouponsApi({
        coupon_id: props.coupon.id,
      })
      loading.value = false
      if (error.value) return

      message.success('领取成功')
      isCouponReceived.value = true
    })
  }
}
</script>

<template>
  <div>
    <NCard class="mb-5 !bg-orange-400 rounded-lg" :class="{ '!bg-gray-300': isCouponReceived }">
      <span class="text-2xl text-white mb-2 font-bold">
        ¥{{ coupon?.price }}
      </span>
      <p class="text-sm text-gray-100">
        适用{{ isCourse ? '课程' : '专栏' }} : {{ coupon?.value.title }}
      </p>
      <p class="text-sm text-gray-100">
        有效期：
        <NTime :time="new Date(coupon.start_time).getTime()" />
        ~
        <NTime :time="new Date(coupon.end_time).getTime()" />
      </p>
      <template #footer>
        <div class="flex justify-end">
          <NButton
            :type="isCouponReceived ? 'default' : 'warning'" :disabled="isCouponReceived"
            @click="getCoupons"
          >
            {{ isCouponReceived ? '已领取' : '立即领取' }}
          </NButton>
        </div>
      </template>
    </NCard>
  </div>
</template>
