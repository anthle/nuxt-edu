<script setup lang="ts">
const route = useRoute()
const { book_id, id } = route.params
const { data, pending, error } = await useGetBookMenuContentApi(+book_id, +id)
const title = computed(() => data.value ? data.value.title : '电子书详情页')
useHead({ title })

definePageMeta({
  middleware(to, from) {
    const { id } = to.params
    if (Number.isNaN(+id)) {
      return abortNavigation('页面不存在')
    }
  },
})
</script>

<template>
  <LoadingGroup :pending="pending" :error="error">
    <div v-if="data" v-html="data.content" />
  </LoadingGroup>
</template>
