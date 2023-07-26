export function useIndexDataApi() {
  return useHttpGet('indexData', '/index', {
    lazy: true,
  })
}

export function useGroupDataApi(query: any) {
  const q = useQueryToString(query)
  return useHttpGet('groupData', `/group/list${q}`)
}
