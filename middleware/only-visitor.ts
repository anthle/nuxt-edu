import { createDiscreteApi } from 'naive-ui'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')
  if (token.value) {
    if (process.client) {
      const { message } = createDiscreteApi(['message'])
      message.error('请勿重复登录')
    }
    return '/'
  }
})
