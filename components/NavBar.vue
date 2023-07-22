<script setup lang="ts">
import { NAvatar, NButton, NDropdown, NIcon } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
import type { MenusItem } from '@/components/Ui/types'

const options = [
  {
    label: '用户资料',
    key: 'center',
  },
  {
    label: '退出',
    key: 'logout',
  },
]

const menus: MenusItem[] = [{
  name: '首页',
  path: '/',
}, {
  name: '考试',
  path: '/paper/1',
  match: [{
    name: 'paper-page',
  }],
}, {
  name: '拼团',
  path: '/list/group/1',
  match: [{
    name: 'list-type-page',
    params: {
      type: 'group',
    },
  }],
}, {
  name: '秒杀',
  path: '/list/flashsale/1',
  match: [{
    name: 'list-type-page',
    params: {
      type: 'flashsale',
    },
  }],
}, {
  name: '直播',
  path: '/list/live/1',
  match: [{
    name: 'list-type-page',
    params: {
      type: 'live',
    },
  }],
}, {
  name: '专栏',
  path: '/list/column/1',
  match: [{
    name: 'list-type-page',
    params: {
      type: 'column',
    },
  }],
}, {
  name: '电子书',
  path: '/list/book/1',
  match: [{
    name: 'list-type-page',
    params: {
      type: 'book',
    },
  }],
}, {
  name: '社区',
  path: '/bbs/0/1',
  match: [{
    name: 'bbs-bbs_id-page',
  }],
}, {
  name: '课程',
  path: '/list/course/1',
  match: [{
    name: 'list-type-page',
    params: {
      type: 'course',
    },
  }],
}]
const route = useRoute()

// 更改query的参数也能正常显示active
function isMenuItemActive(item: MenusItem) {
  if (item.match) {
    const i = item.match.findIndex((o) => {
      let res = true
      if (o.params && typeof o.params === 'object')
        res = Object.keys(o.params).findIndex(k => (o.params as any)[k] === route.params[k]) !== -1
      return o.name === route.name && res
    })
    return i !== -1
  }
  return item.path === route.path
}

function handleOpen(path: string) {
  navigateTo(path)
}
</script>

<template>
  <div class="navbar">
    <div class="container flex items-center h-[60px]">
      <NButton text class="text-xl font-bold">
        Nuxt
      </NButton>

      <UiMenu>
        <UiMenuItem
          v-for="item in menus" :key="item.name" :active="isMenuItemActive(item)"
          @click="handleOpen(item.path)"
        >
          {{ item.name }}
        </UiMenuItem>
      </UiMenu>

      <div class="ml-auto mr-3">
        <NButton circle>
          <template #icon>
            <NIcon>
              <Search />
            </NIcon>
          </template>
        </NButton>
      </div>

      <!-- <NButton strong secondary>
        登录
      </NButton> -->
      <NDropdown trigger="hover" :options="options">
        <NAvatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      </NDropdown>
    </div>
  </div>
  <div class="w-full h-20" />
</template>

<style lang="postcss" scoped>
.navbar {
  @apply bg-white fixed top-0 left-0 right-0 drop-shadow
}

.menu {
  @apply flex items-center px-4 ml-3
}

.menu-item {
  transition: all 0.2s;
  @apply py-1 px-2 mx-1 rounded hover:bg-blue-100 hover:text-blue-700 active:bg-blue-200
}

.menu-item-active {
  @apply bg-blue-100 text-blue-700
}
</style>
