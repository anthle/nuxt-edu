import type { UseFetchOptions } from 'nuxt/app'

const config = {
  headers: {
    appid: 'bd9d01ecc75dbbaaefce',
  },
  baseURL: 'http://demonuxtapi.dishait.cn/pc',
}

function useFetchOption(options: UseFetchOptions<any>) {
  options.baseURL = options.baseURL ?? config.baseURL
  options.headers = options.headers ?? {
    appid: config.headers.appid,
  }
  options.lazy = options.lazy ?? false

  // 用户登录 默认传token
  return options
}

export async function useHttp(key: string, url: string, options: UseFetchOptions<any> = {}) {
  options = useFetchOption(options)
  options.key = key

  const res = await useFetch(url, {
    ...options,
    // 相当于响应拦截器
    transform: (res: any) => {
      return res.data
    },
  })

  return res
}

// GET
export function useHttpGet(key: string, url: any, options: UseFetchOptions<any> = {}) {
  options.method = 'GET'
  return useHttp(key, url, options)
}

// POST
export function useHttpPost(key: string, url: string, options: UseFetchOptions<any> = {}) {
  options.method = 'POST'
  return useHttp(key, url, options)
}
