export interface CardListData {
  checked: boolean
  data: RecommendOrLatestItemData[]
  listType: string
  more: boolean
  showMore: boolean
  title: string
  type: string
}

export interface RecommendOrLatestItemData {
  content?: string
  cover: string
  created_time?: string
  id: number
  is_single?: number
  price: string
  school_id?: number
  status?: number
  sub_count?: number
  t_price: string
  title: string
  try?: string
  type: string
  updated_time: string
}

export interface GroupItemData {
  group_id: number
  id: number
  title: string
  cover: string
  price: string
  t_price: string
  type: string
  start_time: string
  end_time: string
  flashsale_id?: number
}
