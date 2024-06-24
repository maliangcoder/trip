import mlRequest from '@/serives/request'

export function getHomeHotSuggests() {
    return mlRequest.get({
        url: '/home/hotSuggests'
    })
}

export function  getHomeCategories() {
    return mlRequest.get({
        url: '/home/categories',
    })
}

export function getHouseList(currentPage = 1) {
    return mlRequest.get({
        url: '/home/houselist',
        params: {
            page: currentPage
        }
    })
}
