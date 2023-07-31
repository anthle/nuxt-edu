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
