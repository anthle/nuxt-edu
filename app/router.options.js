export default {
  scrollBehavior(to, from, savedPosition) {
    // 切换页面返回原来位置
    if (savedPosition) {
      return savedPosition
    }
    return {
      top: 0,
    }
  },
}
