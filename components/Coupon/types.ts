export interface Coupon {
  c_num: number
  end_time: string
  goods_id: number
  id: number
  isgetcoupon: boolean
  price: string
  received_num: number
  start_time: string
  type: string
  value: {
    id: number
    title: string
  }
}
