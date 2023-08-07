export interface HandleDeletePostFn {
  (params: {
    id: number
    success: () => void
  }): void
}
