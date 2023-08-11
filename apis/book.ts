export function useGetBookMenuApi(id: number) {
  return useHttpGet('bookMenu', `/book/menus?id=${id}`, {
    lazy: true,
  })
}
export function useGetBookMenuContentApi(book_id: number, id: number) {
  return useHttpGet('bookMenuContent', `/book/detail?book_id=${book_id}&id=${id}`, {
    lazy: true,
  })
}
