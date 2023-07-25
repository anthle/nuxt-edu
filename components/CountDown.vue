<script setup lang="ts">
const props = defineProps<{
  time: string | number
}>()

const emit = defineEmits(['start', 'end'])
const data = useCountDown(props.time)

function useCountDown(end_time: string | number) {
  const timeout = ref(0)
  const timer = ref()
  end_time = new Date(end_time).getTime()

  // 结束时间戳 - 当前时间戳
  timeout.value = (end_time - Date.now()) / 1000

  close()
  // 开启倒计时
  if (timeout.value < 0)
    emit('end')

  timer.value = setInterval(() => {
    timeout.value--
    if (timeout.value <= 0) {
      close()
      emit('end')
    }
  }, 1000)

  function close() {
    if (timer.value)
      clearInterval(timer.value)

    emit('end')
  }

  // s => d,h,m
  const d = computed(() => {
    return formatDiffDate(timeout.value)
  })
  return d
}

function formatDiffDate(currentSeconds: number) {
  const time = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (currentSeconds > 0) {
    time.days = Math.floor(currentSeconds / (60 * 60 * 24))
    time.hours = Math.floor(currentSeconds / (60 * 60)) - time.days * 24
    time.minutes = Math.floor(currentSeconds / (60)) - time.days * 24 * 60 - time.hours * 60
    time.seconds = Math.floor(currentSeconds) - time.days * (60 * 60 * 24) - time.hours * (60 * 60) - time.minutes * 60
  }

  const days = time.days < 10 ? `0${time.days}` : time.days
  const hours = time.hours < 10 ? `0${time.hours}` : time.hours
  const minutes = time.minutes < 10 ? `0${time.minutes}` : time.minutes
  const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds

  const newTime = {
    days,
    hours,
    minutes,
    seconds,
  }
  return newTime
}
</script>

<template>
  <div class="count-down">
    <small>{{ data.days }}</small>
    天
    <small>{{ data.hours }}</small>
    :
    <small>{{ data.minutes }}</small>
    :
    <small>{{ data.seconds }}</small>
  </div>
</template>

<style scoped lang="postcss">
.count-down small{
  @apply bg-white rounded px-[3px] py-[2px] text-yellow-500 mx-[3px]
}
</style>
