import { createDiscreteApi } from 'naive-ui'

export function useUser() {
  return useState('user', () => {
    return null
  })
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
  const { message } = createDiscreteApi(['message'])
  message.success('退出登录成功')

  const route = useRoute()
  if (route.path !== '/') {
    navigateTo('/', { replace: true })
  }
}
