<script setup lang="ts">
import { NCard, NSkeleton } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div>
    <NCard v-for="item in 3" :key="item" class="mb-5">
      <NSkeleton text style="width: 30%" /> <NSkeleton text :repeat="3" /> <NSkeleton text style="width: 60%" />
    </NCard>
  </div>
</template>
