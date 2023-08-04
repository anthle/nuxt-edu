<script setup lang="ts">
import { NEmpty } from 'naive-ui'

interface Props {
  desc: string
}
const props = withDefaults(defineProps<Props>(), {
  desc: '暂无数据',
})
</script>

<template>
  <NEmpty :description="desc" />
</template>
