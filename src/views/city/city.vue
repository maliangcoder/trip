<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import useCityStore from "@/stores/modules/city.js";
import {storeToRefs} from "pinia";
import CityGroup from './cpns/city-group.vue'

const router = useRouter()

const searchValue = ref('')
const cancelClick = () => {
  router.back()
}

const tabActive = ref()

// 从store获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const {allCities} = storeToRefs(cityStore)
</script>

<template>
  <div class="city top-page">
    <div class="top">
      <!--  搜索框  -->
      <van-search
          v-model="searchValue"
          shape="round"
          show-action
          placeholder="城市/区域/位置"
          @cancel="cancelClick"
      />
      <!--  tab切换  -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!--      <city-group :group-data="currentGroup" />-->
      <template v-for="(value, key, index) in allCities">
        <city-group v-show="tabActive === key" :group-data="value"/>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.city {
  // top固定定位实现滚动
  //.top {
  //  position: fixed;
  //  top: 0;
  //  left: 0;
  //  right: 0;
  //}
  //.content {
  //  margin-top: 98px;
  //}

  .top {
    position: relative;
    z-index: 9;
  }

  // 布局实现滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
