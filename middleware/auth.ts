import { createDiscreteApi } from 'naive-ui'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')
  const user = useUser()
  const { message } = createDiscreteApi(['message'])

  // 未登录
  if (!token.value) {
    if (process.client) {
      message.error('请先登录')
    }
    return navigateTo(`/login?from=${from.fullPath}`)
  }

  // 未绑定手机号
  const phone = user.value?.phone
  if (!phone && from.name !== 'bindphone') {
    if (process.client) {
      message.error('请先绑定手机号')
    }
    return navigateTo(`/bindphone?from=${from.fullPath}`)
  }
})
