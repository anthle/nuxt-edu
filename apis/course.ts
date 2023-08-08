interface Query {
  id: number
  column_id?: number
}
interface PurchaseCurserParams {
  goods_id: number
  type: 'course' | 'column' | 'book'
}
// 获取coruse数据
export function useGetCourseDataApi(page: number) {
  return useHttpGet('getCourseData', `/course/list?page=${page}`)
}

// 查看课程详情
export function useGetCourseDetailDataApi(query: Query) {
  const q = useQueryToString(query as any)
  return useHttpGet('getCourseDetailData', `/course/read${q}`, {
    lazy: true,
  })
}
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
