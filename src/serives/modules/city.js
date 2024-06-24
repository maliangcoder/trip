import mlRequest from '../request'

export function getCityALl() {
    return mlRequest.get({
        url: "/city/all",
    })
}
