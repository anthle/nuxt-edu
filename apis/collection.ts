interface bodyParams {
  goods_id?: number
  type?: string
}

export function useToggleCollectionApi(type: 'collect' | 'uncollect', body: bodyParams) {
  return useHttpPost('collectionData', `/${type}`, {
    body,
  })
}
