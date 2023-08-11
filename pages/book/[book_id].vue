<script setup lang="ts">
import { NCard, NGi, NGrid, NImage, NScrollbar } from 'naive-ui'

const route = useRoute()
const pagekey = computed(() => route.fullPath)
const { book_id, id } = route.params
const activeId = ref(+id)
const { data, pending, error } = await useGetBookMenuApi(+book_id)

function openRoutePage(menuId: number) {
  activeId.value = menuId
  navigateTo({
    params: {
      ...route.params,
      id: menuId,
    },
  })
}

definePageMeta({
  middleware(to, from) {
    const { book_id } = to.params
    if (Number.isNaN(+book_id)) {
      return abortNavigation('页面不存在')
    }
  },
})
</script>

<template>
  <LoadingGroup :pending="pending" :error="error">
    <NGrid :x-gap="20">
      <NGi :span="6">
        <NScrollbar class="h-[480px] bg-white shadow rounded">
          <div class="flex flex-col items-center justify-center">
            <NImage :src="data.detail.cover" width="60" height="80" class="rounded shadow my-4" />
            <span class="text-sm">{{ data.detail.title }}</span>
          </div>
          <div v-if="data.menus.length > 0" class="mt-10">
            <DetailMenu
              v-for="(item, index) in data.menus" :key="item.id" :menu-data="item" :index="index"
              :active="activeId === item.id" @click="openRoutePage(item.id)"
            />
          </div>
          <template v-else>
            <Empty class="py-10" />
          </template>
        </NScrollbar>
      </NGi>
      <NGi :span="18">
        <NCard>
          <NuxtPage :page-key="pagekey" />
        </NCard>
      </NGi>
    </NGrid>
  </LoadingGroup>
</template>
