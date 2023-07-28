<script setup lang="ts">
import { NCard, NGi, NGrid, NSkeleton } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div>
    <NGrid :x-gap="12" :y-gap="8" :cols="4">
      <NGi v-for="item in 8" :key="item">
        <NCard class="mb-5">
          <template #cover>
            <NSkeleton width="100%" height="150px" />
          </template>
          <NSkeleton height="20px" width="50%" class="my-2" /> <NSkeleton text style="width: 40%" />
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>
