<script setup lang="ts">
import { NGrid, NGridItem } from 'naive-ui'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const pageKey = computed(() => route.fullPath)

const activeName = computed(() => route.name)

const menuOptions = [
  {
    title: '学习记录',
    name: 'user-history-page',
  },
  {
    title: '购买记录',
    name: 'user-purchase-page',
  },
  {
    title: '我的考试',
    name: 'user-test-page',
  },
  {
    title: '我的帖子',
    name: 'user-post-page',
  },
  {
    title: '优惠券记录',
    name: 'user-coupon-page',
  },
  {
    title: '我的收藏',
    name: 'user-collection-page',
  },
  {
    title: '修改资料',
    name: 'user-edit',
  },
  {
    title: '修改密码',
  },
  {
    title: '其他设置',
  },
]

async function navigate(name: string | undefined) {
  if (name?.includes('page')) {
    await navigateTo({
      name,
      params: {
        page: 1,
      },
    })
  }
  else {
    await navigateTo({
      name,
    })
  }
}
</script>

<template>
  <div>
    <NGrid :x-gap="12" :y-gap="8">
      <NGridItem :span="5">
        <ul class="center-menu">
          <li
            v-for="item in menuOptions" :key="item.title" :class="{ active: item.name === activeName }"
            @click="navigate(item.name)"
          >
            {{ item.title }}
          </li>
        </ul>
      </NGridItem>
      <NGridItem :span="19">
        <div class="bg-white rounded mb-10 min-h-[75vh]">
          <NuxtPage :page-key="pageKey" />
        </div>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style lang="postcss" scoped>
.center-menu {
  @apply list-none bg-white rounded-xl p-0 m-0
}

.center-menu li {
  @apply px-5 py-3 text-sm cursor-pointer hover:bg-blue-50
}

.center-menu .active {
  @apply font-bold text-blue-500 bg-gray-200
}
</style>
