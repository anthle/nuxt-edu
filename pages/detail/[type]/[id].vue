<script setup lang="ts">
import type { MenuData } from 'components/DetailMenu/types'
import type { AnyObject } from 'globalTypes'
import { NButton, NGi, NGrid, NImage, createDiscreteApi } from 'naive-ui'
import type { LocationQueryValue } from '.nuxt/vue-router'

const route = useRoute()
const type = route.params.type
const id = Number(route.params.id)
const query = requestQuery()

initHeader()

const { data, pending, error, refresh } = await useGetContentDetailDataApi(type as 'course' | 'column' | 'book', query)

const title = computed(() => !pending.value ? data.value.title : '详情页')

useHead({ title })

const typeMap: AnyObject = {
  media: '图文',
  video: '视频',
  audio: '音频',
}

const subTitle = computed(() => {
  let title = ''
  const dataType = data.value.type
  if (type === 'course') {
    title = `【${typeMap[dataType as keyof AnyObject]}】`
  }
  return `${title}${data.value.sub_count}人学过`
})

const hasPurchasedCourse = computed(() => data.value.isbuy && data.value.type === 'media' ? data.value.content : data.value.try)

function purchaseCourse() {
  // 先进行登录判断
  useHasAuth(async () => {
    // price是免费的情况
    if (Number.parseInt(data.value.price) === 0) {
      const { error } = await usePurchaseCurserApi({
        goods_id: data.value.id,
        type: type as 'course' | 'column' | 'book',
      })
      if (!error.value) refresh()
    }
  })
}

const activeTab = ref('detail')

const tabMap = [
  {
    label: '详情',
    value: 'detail',
  },
]

if (type === 'book' || type === 'column') {
  tabMap.push({
    label: '目录',
    value: 'menu',
  })
}

function handleChangeType(type: string) {
  activeTab.value = type
}

function requestQuery() {
  const { column_id } = route.query
  const query: { id: number; column_id?: LocationQueryValue | LocationQueryValue[] } = {
    id,
  }

  if (column_id) {
    query.column_id = column_id
  }
  return query
}

const freeChapterList = computed(() => {
  const fcl: number[] = []
  if (type === 'book') {
    data.value.book_details.forEach((item: any) => {
      if (item.isfree === 1) {
        fcl.push(item.id)
      }
    })
  }
  return fcl
})

function menuToStudyPage(menuData?: MenuData) {
  useHasAuth(() => {
    const { message } = createDiscreteApi(['message'])
    if (type === 'column' && Number.parseInt(data.value.price) !== 0 && !data.value.isbuy) {
      return message.error('请先购买该专栏')
    }

    let url = ''
    if (type === 'column') {
      url = `/detail/course/${menuData?.id}?column_id=${data.value.id}`
    }
    else if (type === 'book') {
      url = `/book/${data.value.id}/${freeChapterList.value[0]}`
    }
    navigateTo(url)
  })
}

const isBookStyle = computed(() => {
  return type === 'book' ? 'w-[130px] h-[180px] rounded mr-5 ml-3' : 'w-[340px] h-[200px] rounded mr-5'
})

const menuType = computed(() => type === 'book' ? data.value.book_details : data.value.column_courses)

function initHeader() {
  if (type === 'course') {
    useHead({
      link: [{
        rel: 'stylesheet',
        href: '/aplayer/APlayer.min.css',
      }],
      script: [{
        src: '/aplayer/APlayer.min.js',
      }, {
        src: '//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js',
      }],
    })
  }

  if (type === 'live') {
    useHead({
      script: [{
        src: '/aplayer/APlayer.min.js',
      }, {
        src: '//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js',
      }, {
        src: '//unpkg.byted-static.com/xgplayer-flv/2.5.1/dist/index.min.js',
      }],
    })
  }
}
</script>

<template>
  <LoadingGroup :pending="pending" :error="error">
    <section v-if="data.isbuy && (data.type !== 'media' && type === 'course') || type === 'live'" class="py-4">
      <ClientOnly>
        <template #fallback>
          <LoadingAudioSkeleton v-if="data.type === 'audio'" />
          <LoadingSkeleton v-else />
        </template>

        <!-- 音频播放器 -->
        <PlayerAudio v-if="data.type === 'audio'" :title="data.title" :cover="data.cover" :url="data.content" />
        <!-- 视频播放器 -->
        <PlayerVideo v-if="data.type === 'video'" :url="data.content" />
        <!-- 直播播放器 -->
        <PlayerLive v-if="data.type === 'live'" :url="data.playUrl" />
      </ClientOnly>
    </section>
    <section v-else class="mt-5 bg-white border flex p-5 mb-5 rounded">
      <NImage :src="data.cover" object-fit="cover" :class="isBookStyle" :width="type === 'book' ? '130' : '340'" />
      <div class="flex flex-col justify-start ml-5 p-2">
        <div class="text-xl flex items-center">
          {{ data.title }}
          <CollectionBtn class="ml-2" :is-collection="data.isfava" :goods_id="data.id" :content-type="type as string" />
        </div>
        <p class="text-xs text-gray-400">
          {{ subTitle }}
        </p>
        <div v-if="!data.isbuy" class="flex">
          <Price :price="data.price" class="text-xl" />
          <Price :price="data.t_price" through class="text-xs" />
        </div>
        <div v-if="type !== 'live'" class="my-2">
          <CouponModal />
        </div>
        <div v-else class="my-2">
          <LiveStatusBar :start-time="data.start_time" :end-time="data.end_time" />
        </div>
        <div v-if="!data.isbuy" class="mt-auto">
          <template v-if="type === 'book'">
            <template v-if="menuType.length > 0">
              <NButton type="primary" @click="purchaseCourse">
                立即学习
              </NButton>
              <NButton
                v-if="freeChapterList.length > 0" class="ml-2" strong secondary type="primary"
                @click="menuToStudyPage()"
              >
                免费试看
              </NButton>
            </template>
            <NButton v-else strong secondary type="primary" @click="purchaseCourse">
              敬请期待
            </NButton>
          </template>
          <NButton v-else type="primary" @click="purchaseCourse">
            立即学习
          </NButton>
        </div>
      </div>
    </section>
    <div>
      <NGrid :x-gap="20">
        <NGi :span="18">
          <section class="bg-white rounded mb-5">
            <div class="border-b border-solid border-gray-200 border-0">
              <UiTab>
                <UiTabItem
                  v-for=" item in tabMap " :key="item.value" :active="item.value === activeTab"
                  @click="handleChangeType(item.value)"
                >
                  {{ item.label }}
                </UiTabItem>
              </UiTab>
            </div>

            <div v-if="activeTab === 'detail'" class="content px-5" v-html="hasPurchasedCourse" />
            <DetailMenuList v-else>
              <template v-if="menuType.length > 0">
                <DetailMenu
                  v-for="(item, index) in menuType " :key="item.id" :menu-data="item" :index="index"
                  @click="menuToStudyPage(item)"
                />
              </template>
              <template v-else>
                <Empty class="py-10" />
              </template>
            </DetailMenuList>
          </section>
        </NGi>
        <NGi :span="6">
          <HotCourse />
        </NGi>
      </NGrid>
    </div>
  </LoadingGroup>
</template>

<style lang="postcss" scoped>
:deep(.content img) {
  max-width: 100%;
}
</style>
