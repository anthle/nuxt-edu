// 获取我的帖子数据
export function useUserPostApi(page: number) {
  return useHttpGet('postData', `/mypost?page=${page}`, {
    lazy: true,
  })
}

// 点赞或者取消点赞
export function useUserLikeOrUnlikeApi(post_id: number, type = 'support') {
  return useHttpPost('like', `/post/${type}}`, {
    body: {
      post_id,
    },
  })
}
