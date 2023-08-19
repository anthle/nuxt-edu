// 将query对象转换成?x=x&y=y的格式
// 函数形式代表动态传参
type Query = (() => { type: string; keyword: string; page: number | Ref<number> }) | { [key: string]: string | number }

export function useQueryToString(query: Query) {
  const getQueryParamValue = (key: string) => {
    if (typeof query === 'function') {
      const r = query()
      return (r as any)[key]
    }
    else {
      return query[key]
    }
  }

  let q = ''
  for (const key in query) {
    const paramValue = getQueryParamValue(key)
    q += `${q === '' ? '?' : '&'}${key}=${paramValue}`
  }

  return q
}

// 时间状态判断
export function useTimeStatus(start: any, end: any) {
  start = (new Date(start)).getTime()
  end = (new Date(end)).getTime()

  const now = Date.now()
  let status = ''
  if (start < now && now < end) {
    status = 'ing'
  }
  else if (start > now) {
    status = 'pending'
  }
  else {
    status = 'end'
  }

  return status
}
