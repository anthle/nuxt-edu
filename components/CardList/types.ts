export interface CardListData {
  checked: boolean
  data: ItemData[]
  listType: string
  more: boolean
  showMore: boolean
  title: string
  type: string
}

export interface ItemData {
  content: string
  cover: string
  created_time: string
  id: number
  is_single: number
  price: string
  school_id: number
  status: number
  sub_count: number
  t_price: string
  title: string
  try: string
  type: string
  updated_time: string
}
