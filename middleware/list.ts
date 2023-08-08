import type { AnyObject } from 'globalTypes'

const listMap: AnyObject = {
  group: '拼团',
  flashsale: '秒杀',
  live: '直播',
  column: '专栏',
  book: '电子书',
  course: '课程',
}

export default defineNuxtRouteMiddleware((to, from) => {
  const { type, page } = to.params
  if (Object.keys(listMap).includes(type as string) && !Number.isNaN(page)) {
    const title = `${listMap[type as keyof AnyObject]}列表`
    useHead({ title })
    to.meta.title = title
    return true
  }
  return abortNavigation('页面不存在')
})
