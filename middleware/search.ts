export default defineNuxtRouteMiddleware((to, from) => {
  const { type, page } = to.params
  const { keyword } = to.query
  if (!keyword) {
    return abortNavigation('搜索关键词不能为空')
  }

  const isExistPage = ['course', 'column'].includes(type as string) && (Number.isInteger(Number(page)) && Number(page) > 0)

  if (!isExistPage) {
    return abortNavigation('页面不存在')
  }
})
