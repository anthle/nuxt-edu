export function useIndexDataApi() {
  return useHttp('indexData', '/index', {
    lazy: true,
  })
}

interface Query {
  page: number | Ref<number>
  usable: number
}

export function useGroupDataApi(query: Query) {
  const q = useQueryToString(query as any)
  return useHttpGet('groupData', `/group/list${q}`)
}
