// 将query对象转换成?x=x&y=y的格式
export function useQueryToString(query: { [key: string]: string | number }) {
  let q = ''
  for (const key in query) {
    if (q === '')
      q = `?${key}=${query[key]}`

    else
      q += `&${key}=${query[key]}`
  }

  return q
}
