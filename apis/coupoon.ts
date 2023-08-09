import type { GetCoupons } from './types'

export function useGetCouponDataApi(page: number) {
  return useHttpGet('getCouponData', '/coupon/list')
}

export function useGetCouponsApi(body: GetCoupons) {
  return useHttpPost('getCoupons', '/user_coupon/receive', {
    body,
  })
}
