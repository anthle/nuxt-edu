interface LoginBody {
  username: string
  password: string
}

export function useLoginApi(body: LoginBody) {
  return useHttpPost('login', '/login', {
    body,
  })
}

export function useGetinfoApi() {
  return useHttpGet('getinfo', '/getinfo')
}

export function useLogoutApi() {
  return useHttpPost('logout', '/logout')
}
