<script setup lang="ts">
import { NButton, NResult } from 'naive-ui'

interface Props {
  pending?: boolean
  error?: any
  isEmpty?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pending: false,
  error: false,
  isEmpty: false,
})

const loading = ref(false)

const stop = watchEffect(() => {
  if (props.pending && !loading.value) {
    loading.value = true
  }
  else {
    setInterval(() => {
      loading.value = false
    }, 200)
  }
})

onBeforeUnmount(() => stop())
</script>

<template>
  <div>
    <div>
      <template v-if="loading">
        <div>
          <slot name="loading">
            <LoadingSkeleton />
          </slot>
        </div>
      </template>
      <template v-else-if="error">
        <div>
          <NResult class="mt-10" status="500" title="错误提示123" :description="error.data.data || '页面走丢了~'">
            <template #footer>
              <NButton @click="$router.go(-1)">
                返回上一级
              </NButton>
            </template>
          </NResult>
        </div>
      </template>
      <template v-else-if="isEmpty">
        <Empty />
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>
