import mlRequest from '@/serives/request'

export function getDetailInfos(houseId) {
  return mlRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}
