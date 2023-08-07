<script setup lang="ts">
import { NSpin, NUpload, createDiscreteApi } from 'naive-ui'
import type { FuncOrRecordOrUndef } from 'naive-ui/es/upload/src/interface'
import type { UploadFileInfo } from 'naive-ui'

const props = defineProps<{
  data?: FuncOrRecordOrUndef
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const { action, headers }: { action: string; headers: FuncOrRecordOrUndef } = useUploadConfig()

const fileList = ref<UploadFileInfo[]>([])

function initFileList() {
  fileList.value = props.modelValue
    ? [{
        id: props.modelValue,
        name: props.modelValue,
        status: 'finished',
        url: props.modelValue,
      }]
    : []
}

initFileList()

function handleError(e: any) {
  const { message } = createDiscreteApi(['message'])
  message.error('上传失败')
}
function handleSuccess(e: any) {
  const { file, event } = e
  const response = JSON.parse(event.target.response)
  file.url = response.data
  return file
}

// 监听filelist的变化
const stop = watch(() => fileList, (newvalue) => {
  updateModelValue()
}, {
  deep: true,
})

function updateModelValue() {
  const urls: any[] = []
  fileList.value.forEach((item: any) => {
    if (item.status === 'finished' && item.url) {
      urls.push(item.url)
    }
  })
  emit('update:modelValue', urls[0] || '')
}

onBeforeUnmount(() => stop)
</script>

<template>
  <div class="w-full">
    <ClientOnly>
      <template #fallback>
        <div class="border rounded bg-gray-50 flex justify-center items-center w-[94px] h-[94px]">
          <NSpin />
        </div>
      </template>
      <NUpload
        v-model:file-list="fileList" :action="action" :headers="headers" name="file" :data="data"
        list-type="image-card" :max="1" :on-error="handleError" :on-finish="handleSuccess" :multiple="false"
        accept="image/png,image/jpeg,image/gif"
      />
    </ClientOnly>
  </div>
</template>
