import type { BindPhoneBody, ForgotBody, LoginBody, RegisterBody } from './types'

// 登录
export function useLoginApi(body: LoginBody) {
  return useHttpPost('login', '/login', {
    body,
  })
}

// 刷新重新获取数据
export function useGetinfoApi() {
  return useHttpGet('getinfo', '/getinfo')
}

// 退出登录
export function useLogoutApi() {
  return useHttpPost('logout', '/logout')
}

// 注册
export function useRegisterApi(body: RegisterBody) {
  return useHttpPost('register', '/reg', {
    body,
  })
}

// 获取手机验证码
export function useGetCaptchaApi(phone: string) {
  return useHttpPost('captcha', '/get_captcha', {
    body: {
      phone,
    },
  })
}

// 绑定手机号
export function usebindMobileApi(body: BindPhoneBody) {
  return useHttpPost('bindMobile', '/bind_mobile', {
    body: {
      phone: body.phone,
      code: body.captcha,
    },
  })
}

// 绑定手机号
export function useForgotApi(body: ForgotBody) {
  const { captcha, ...rest } = body
  return useHttpPost('forgot', '/forgot', {
    body: {
      ...rest,
      code: captcha,
    },
  })
}
