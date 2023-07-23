<script setup lang="ts">


const { data, pending, error } = await useFetch('/index', {
  key: 'indexData',
  headers: {
    appid: 'bd9d01ecc75dbbaaefce',
  },
  baseURL: 'http://demonuxtapi.dishait.cn/pc',
  transform: (res: any) => {
    return res.data
  },
  lazy: true,
})

if (process.server && error.value){
  console.log(error.value);
  throw createError(error.value?.data?.data)
}
</script>

<template>
  <div>
    <template v-if="pending">
      加载中...
    </template>
    <template v-else-if="error">
      <div>
        {{ error?.data.data }}
      </div>
    </template>
    <template v-else>
      <template v-for="item in data" :key="item.src">
        <Banner :data="item.data" v-if="item.type === 'swiper'" />
      </template>
    </template>
  </div>
</template>
