<script setup lang="ts">
useHead({
  title: '首页',
  titleTemplate: '',
})

const { data, pending, error } = await useIndexDataApi()
// const { data, pending, error } = await useFetch('/index', {
//   key: 'indexData',
//   headers: {
//     appid: 'bd9d01ecc75dbbaaefce',
//   },
//   baseURL: 'http://demonuxtapi.dishait.cn/pc',
//   transform: (res: any) => {
//     return res.data
//   },
//   lazy: true,
// })

if (process.server && error.value)
  throw createError(error.value?.data?.data)
</script>

<template>
  <div>
    <LoadingGroup :pending="pending" :error="error">
      <template v-for="item in data" :key="item.src">
        <Banner v-if="item.type === 'swiper'" :data="item.data" />
        <ImageNav v-if="item.type === 'icons'" :image-data="item.data" />
        <ImageAd v-if="item.type === 'imageAd'" :image-ad-data="item.data" />
        <CardList v-if="item.type === 'promotion'" :card-list-data="item" type="group" />
        <CardList v-if="item.type === 'list'" :card-list-data="item" />
      </template>
    </LoadingGroup>
  </div>
</template>
