// 获取coruse数据
export function useGetCourseDataApi(page: number) {
  return useHttpGet('getCourseData', `/course/list?page=${page}`)
}
