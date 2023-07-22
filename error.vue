<script setup lang="ts">
import { NButton, NResult } from 'naive-ui'

defineProps({
  error: Object,
})
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div style="margin-top: 100px;">
    <NResult status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <NButton @click="handleError">
          找点乐子吧
        </NButton>
      </template>
    </NResult>
  </div>
</template>
