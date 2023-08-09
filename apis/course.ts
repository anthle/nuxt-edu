import type { PurchaseCurserParams } from './types'

// 获取推荐课程数据
export function useGetHotCourseDataApi() {
  return useHttpGet('getHotCourseData', '/hot')
}

// 购买课程
export function usePurchaseCurserApi(body: PurchaseCurserParams) {
  return useHttpPost('purchaseCurser', '/order/learn', {
    body,
  })
}
