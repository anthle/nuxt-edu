import type { GetContentDetail, contentType } from './types'

// 专栏 电子书 课程通用接口
export function useContentListDataApi(type: contentType, page: number) {
  return useHttpGet(`'get${type}ListData'`, `/${type}/list?page=${page}`, {
    lazy: true,
  })
}

// 专栏 电子书 课程通用接口
export function useGetContentDetailDataApi(type: contentType, query: GetContentDetail) {
  const q = useQueryToString(query as any)
  return useHttpGet(`get${type}}DetailData`, `/${type}/read${q}`, {
    lazy: true,
  })
}
