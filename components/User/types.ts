// study page
export interface StudyHistoryListType {
  audio: string
  video: string
  media: string
  column: string
  book: string
  course: string
}

// purchase page
export interface PurchaseHistoryListStatus {
  closed: string
  success: string
  pendding: string
  grouping: string
}

export interface PurchaseHistoryListType {
  group: string
  flashsale: string
}

// test page
export interface TestHistoryList {
  answer_status: number
  created_time: string
  id: number
  read_status: number
  score: number
  testpaper: TestPaper
}

interface TestPaper {
  id: number
  title: string
  total_score: number
  pass_score: number
  expire: number
  question_count: number
}

// post page
interface PostDesc {
  text: string
  images: ImageUrl[]
}

type ImageUrl = string

interface User {
  id: number
  avatar: string
  sex: string
  name: string
}

export interface MyPostList {
  id: number
  bbs_id: number
  desc: PostDesc
  user_id: number
  comment_count: number
  support_count: number
  is_top: number
  created_time: string
  user: User
  issupport: boolean
}

// coupon page
export interface couponData {
  id: number
  price: string
  start_time: string
  end_time: string
  type: string
  used: number
  title: string
  goods_id: number
}

// collection page
export interface collectionData {
  id: number
  type: string
  goods: {
    id: number
    title: string
    cover: string
    try: string
    type: string
  }
}
