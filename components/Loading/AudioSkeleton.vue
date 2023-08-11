<script setup lang="ts">
import { NCard, NSkeleton } from 'naive-ui'

const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div>
    <NCard class="card mb-5 h-[66px]">
      <div class="flex">
        <NSkeleton :width="66" :height="66" size="medium" />
        <div class="flex flex-col justify-between w-full ml-5 p-3">
          <NSkeleton style="width: 30%" class="h-[18px]" />
          <NSkeleton style="width: 100%" class="h-[3px]" />
        </div>
      </div>
    </NCard>
  </div>
</template>

<style lang="postcss" scoped>
:deep(.n-card__content){
  @apply p-0
}
.card{
  --n-padding-bottom:0px
}
</style>
