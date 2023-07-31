interface Query {
  page: number | Ref<number>
  usable: number
}

export function useIndexDataApi() {
  return useHttpGet('indexData', '/index', {
    lazy: true,
  })
}

export function useGroupDataApi(query: Query) {
  const q = useQueryToString(query as any)
  return useHttpGet('groupData', `/group/list${q}`)
}
