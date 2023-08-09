export interface LoginBody {
  username: string
  password: string
}

export interface RegisterBody {
  username: string
  password: string
  repassword: string
}

export interface BindPhoneBody {
  phone: string
  captcha: string
}

export interface ForgotBody {
  phone: string
  captcha: string
  password: string
  repassword: string
}

export interface UserHistroyCallbackFunc {
  (): {
    page: number
    type: string
  }
}
export interface UserPurchaseHistroyCallbackFunc {
  (): {
    page: number
  }
}

export interface UpdateUserInfoParams {
  avatar: string
  nickname: string
  sex: '男' | '女' | '未知'
}

// password page
export interface UpdatePassword {
  opassword: string
  password: string
  repassword: string
}

// GetCoupons
export interface GetCoupons {
  coupon_id: number
}
