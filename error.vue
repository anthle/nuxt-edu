<script setup lang="ts">
import { NButton, NResult } from 'naive-ui'

const props = defineProps({
  error: Object,
})
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div style="margin-top: 100px;">
    <NResult status="404" title="错误提示" :description="error!.message">
      <template #footer>
        <NButton @click="handleError">
          回到首页
        </NButton>
      </template>
    </NResult>
  </div>
</template>
