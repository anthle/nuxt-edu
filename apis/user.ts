import type { BindPhoneBody, ForgotBody, LoginBody, RegisterBody, UserHistroyCallbackFunc } from './types'

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

// 获取学习记录数据

export function useUserHistoryApi(query: UserHistroyCallbackFunc) {
  const r = query()
  const q = useQueryToString(r)
  return useHttpGet('groupData', `/user_history/list${q}`, {
    lazy: true,
  })
}

// 获取购买数据
export function useUserPurchaseHistoryApi(page: number) {
  return useHttpGet('purchaseData', `/order/list?page=${page}`, {
    lazy: true,
  })
}

// 获取考试数据
export function useUserTestHistoryApi(page: number) {
  return useHttpGet('testData', `/user_test/list?page=${page}`, {
    lazy: true,
  })
}

// 获取优惠券数据
export function useUserCouponApi(page: number) {
  return useHttpGet('couponData', `/user_coupon?page=${page}`, {
    lazy: true,
  })
}

// 获取我的收藏数据
export function useUsercollectionApi(page: number) {
  return useHttpGet('collectionData', `/user_fava?page=${page}`, {
    lazy: true,
  })
}
