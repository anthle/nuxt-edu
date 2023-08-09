<script setup lang="ts">
import type { AnyObject } from 'globalTypes'
import { NButton, NGi, NGrid, NImage } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()

const route = useRoute()
const type = route.params.type

const id = Number(route.params.id)

const { data, pending, error, refresh } = await useGetCourseDetailDataApi({ id })

const title = computed(() => !pending.value ? data.value.title : '详情页')

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
</script>

<template>
  <LoadingGroup :pending="pending" :error="error">
    <section class="mt-5 bg-white border flex p-5 mb-5 rounded">
      <NImage :src="data.cover" object-fit="cover" class="w-[340px] h-[200px] rounded mr-5" />
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
        <div class="my-2">
          <CouponModal />
        </div>
        <div v-if="!data.isbuy" class="mt-auto">
          <NButton type="primary" @click="purchaseCourse">
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
                <UiTabItem active>
                  详情
                </UiTabItem>
              </UiTab>
            </div>

            <div class="content px-5" v-html="hasPurchasedCourse" />
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
