<script setup lang="ts">
import { NButton, NIcon, NImage, NTag } from 'naive-ui'
import { ChatbubbleOutline, HeartOutline, TrashOutline } from '@vicons/ionicons5'
import type { MyPostList } from './types'

const props = defineProps<{
  myPostList: MyPostList
}>()

const hasMultipleImage = computed(() => {
  return props.myPostList.desc.images.length > 1
})

function handleLike(item: MyPostList) {
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

    item.issupport = !item.issupport
  })
}
</script>

<template>
  <div class="p-5 border-b border-solid border-0 border-gray-200">
    <div class="text-gray-600 cursor-pointer mb-3">
      <NTag type="success" size="small">
        置顶
      </NTag>
      {{ myPostList.desc.text }}
    </div>
    <div class="mb-3">
      <NImage
        v-for="item in myPostList.desc.images" :key="item" class="mr-3 rounded" :src="item"
        :width="hasMultipleImage ? 150 : 300" :height="hasMultipleImage ? 100 : 200"
      />
    </div>
    <div class="flex items-center">
      <div class="likeBtnContainer flex items-center cursor-pointer mr-3">
        <NButton class="likeBtn mr-1" ghost circle @click="handleLike(myPostList)">
          <template #icon>
            <NIcon>
              <HeartOutline />
            </NIcon>
          </template>
        </NButton>
        <span class="likeCount">
          {{ myPostList.support_count }}
        </span>
      </div>

      <div class="commentBtnContainer flex items-center cursor-pointer mr-3">
        <NButton class="commentBtn mr-1" ghost circle>
          <template #icon>
            <NIcon>
              <ChatbubbleOutline />
            </NIcon>
          </template>
        </NButton>
        <span class="commentCount">
          {{ myPostList.comment_count }}
        </span>
      </div>

      <NButton class="deleteBtn mr-3" ghost circle>
        <template #icon>
          <NIcon>
            <TrashOutline />
          </NIcon>
        </template>
      </NButton>
      <NButton text size="small" class="mr-3">
        作者：{{ myPostList.user.name }}
      </NButton>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.likeBtn {
  --n-border: 0px;
  --n-border-hover: 0px;
  --n-text-color-hover: rgb(249, 24, 128);
  --n-text-color-pressed: rgb(249, 24, 128);
  --n-ripple-color:none;
  --n-border-focus:none;
  --n-text-color-focus:none;
  --n-border-pressed:none;
}
.likeBtnContainer:hover .likeBtn{
  background-color: rgb(247, 234, 235);
  @apply text-[#F91880]
}
.likeBtnContainer:hover .likeCount{
  @apply text-[#F91880]
}

.commentBtn {
  --n-border: 0px;
  --n-border-hover: 0px;
  --n-text-color-hover: rgb(29, 155, 240);
  --n-text-color-pressed: rgb(29, 155, 240);
  --n-ripple-color:none;
  --n-border-focus:none;
  --n-text-color-focus:none;
  --n-border-pressed:none;
}

.commentBtnContainer:hover .commentBtn{
  background-color: rgb(225, 238, 246);
  @apply text-[#1D9BF0]
}
.commentBtnContainer:hover .commentCount{
  @apply text-[#1D9BF0]
}

.deleteBtn {
  --n-border: 0px;
  --n-border-hover: 0px;
  --n-text-color-hover: rgb(244, 33, 46);
  --n-text-color-pressed: rgb(244, 33, 46);
  --n-ripple-color:none;
  --n-border-focus:none;
  --n-text-color-focus:none;
  --n-border-pressed:none;
}
.deleteBtn:hover {
  background-color: rgb(247, 234, 235);
}
</style>
