export function useSearchDataApi(query: any) {
  console.log(123)

  return useHttpGet('searchListData', () => {
    const r = query()
    const q = useQueryToString(r)
    return `/search${q}`
  }, {
    lazy: true,
  })
}
