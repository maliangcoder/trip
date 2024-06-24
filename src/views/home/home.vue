<script setup>
import HomeSearchBox from "@/views/home/cpns/home-search-box.vue";
import HomeCategories from "@/views/home/cpns/home-categories.vue";
import HomeContent from "@/views/home/cpns/home-content.vue";
import SearchBar from "@/components/search-bar/search-bar.vue";
import useHomeStore from "@/stores/modules/home.js";
import useScroll from "@/hooks/useScroll.js";
import { computed, onActivated, ref, watch } from "vue";

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

const homeRef = ref()
// 监听窗口的滚动
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  newValue && homeStore.fetchHouseListData().then(() => {
    isReachBottom.value = false
  })
})

// 搜索框的显示与隐藏,使用计算属性成为响应式数据
const isShowSearchBar = computed(() => {
  return scrollTop.value > 360
})

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  })
})

</script>

<template>
  <div class="home" ref="homeRef">
    <div class="banner">
      <img src="https://imgs.699pic.com/images/401/728/630.jpg!list1x.v2" alt="">
    </div>
    <home-search-box/>
    <home-categories/>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>
    <home-content/>
  </div>
</template>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 100px;
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #ffffff;
}
</style>
