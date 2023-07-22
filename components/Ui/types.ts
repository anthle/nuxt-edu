export interface MenusItem {
  name: string
  path: string
  match?: {
    name: string
    params?: {
      type: string
    }
  }[]
}
