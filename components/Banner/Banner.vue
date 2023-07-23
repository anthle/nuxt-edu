<script setup lang="ts">
import { NCarousel } from 'naive-ui'
import type { Swiper } from './types'

const props = defineProps<{
  data: Swiper[]
}>()

function open(item: Swiper) {
  if (item.type === 'webview')
    window.open(item.url)
}
</script>

<template>
  <div>
    <NCarousel class="mb-6 rounded cursor-pointer" show-arrow>
      <img v-for="item in data" :key="item.src" class="carousel-img" :src="item.src" @click="open(item)">
    </NCarousel>
  </div>
</template>
