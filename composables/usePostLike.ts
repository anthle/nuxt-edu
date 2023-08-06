import { createDiscreteApi } from 'naive-ui'
import type { MyPostList } from '@/components/User/types'

export function usePostLike() {
  const handleLike = (item: MyPostList) => {
    useHasAuth(async () => {
      const type = item.issupport ? 'unsupport' : 'support'
      const msg = item.issupport ? '取消点赞' : '点赞'

      const { error } = await useUserLikeOrUnlikeApi(item.id, type)

      if (error.value) return

      if (type === 'unsupport') {
        item.support_count--
      }
      else {
        item.support_count++
      }

      const { message } = createDiscreteApi(['message'])
      message.success(`${msg}成功`)

      item.issupport = !item.issupport
    })
  }

  return {
    handleLike,
  }
}
