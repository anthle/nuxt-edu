import type { PaginationParams } from './types'

export async function usePagination(initListApiCallback: any) {
  const route = useRoute()
  const page = ref(Number.parseInt(route.params.page as string))

  const limit = ref(10)

  const params: PaginationParams = {
    page: page.value,
    limit: limit.value,
  }
  const { data, pending, error, refresh } = await initListApiCallback(params)
  const rows = computed(() => data.value?.rows || [])
  const total = computed(() => data.value?.count || 0)

  const handlePageChange = (p: number) => {
    navigateTo({
      params: {
        ...route.params,
        page: p,
      },
      query: {
        ...route.query,
      },
    })
  }

  return { page, limit, data, pending, error, refresh, rows, total, handlePageChange }
}
