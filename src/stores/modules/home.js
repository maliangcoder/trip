import {defineStore} from "pinia";
import {getHomeCategories, getHomeHotSuggests, getHouseList} from '@/serives/index.js'

const useHomeStore = defineStore('home', {
    state: () => ({
        hotSuggests: [],
        categories: [],
        currentPage: 1,
        houseList: []
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouseListData() {
            const res = await getHouseList(this.currentPage)
            this.houseList.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore
