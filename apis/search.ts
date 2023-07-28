export function useSearchDataApi(query: any) {
  return useHttpGet('searchListData', () => {
    const r = query()
    const q = useQueryToString(r)
    return `/search${q}`
  }, {
    lazy: true,
  })
}
