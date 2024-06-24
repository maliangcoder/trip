import {defineStore} from 'pinia'
import {getCityALl} from "@/serives/index.js";

const useCityStore = defineStore('city', {
    state: () => ({
        allCities: {},
        currentCity: {
            cityName: '上海'
        },
    }),
    actions: {
        async fetchAllCitiesData() {
            const res = await getCityALl()
            this.allCities = res.data
        }
    }
})

export default useCityStore
