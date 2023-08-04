interface UserHistroyCallbackFunc {
  (): {
    page: number
    type: string
    keyword: string
  }
}

export function useSearchDataApi(query: UserHistroyCallbackFunc) {
  return useHttpGet('searchListData', () => {
    const r = query()
    const q = useQueryToString(r)
    return `/search${q}`
  }, {
    lazy: true,
  })
}
