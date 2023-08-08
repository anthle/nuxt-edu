import { createDiscreteApi } from 'naive-ui'
import type { User } from './types'

export function useUser() {
  const user: Ref<User | null> = useState('user', () => {
    return null
  })
  return user
}

export async function useRefreshUserInfo() {
  const token = useCookie('token')
  const user = useUser()
  if (token.value) {
    const { data, error } = await useGetinfoApi()
    if (data.value) {
      user.value = data.value
    }
  }
}

export async function useLogout() {
  await useLogoutApi()
  const user = useUser()
  user.value = null
  const token = useCookie('token')
  token.value = null

  const route = useRoute()
  if (route.path !== '/') {
    navigateTo('/', { replace: true })
  }
}

type NullableFunction = (() => void) | null
export function useHasAuth(callback: NullableFunction = null) {
  const route = useRoute()
  const token = useCookie('token')
  const user = useUser()
  const { message } = createDiscreteApi(['message'])

  // 未登录
  if (!token.value) {
    message.error('请先登录')
    return navigateTo(`/login?from=${route.fullPath}`)
  }

  // 未绑定手机号
  const phone = user.value?.phone
  if (!phone && route.name !== 'bindphone') {
    message.error('请先绑定手机号')
    return navigateTo(`/bindphone?from=${route.fullPath}`)
  }

  if (callback && typeof callback === 'function') {
    callback()
  }
}
