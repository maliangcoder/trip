<script setup>
import tabbarData from "@/assets/data/tabbar.js";
import {getAssetURL} from "@/utils/load_assets_img.js";
import {ref} from 'vue'

const currentIndex = ref(0)
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="item in tabbarData" :key="item.text">
        <van-tabbar-item icon="home-o" active-color :to="item.path">
          <span>{{ item.text }}</span>
<!--          <template #icon>-->
<!--            <img :src="getAssetURL(item.image)" alt="">-->
<!--          </template>-->
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>

.tab-bar {
  img {
    height: 30px;
  }
}

</style>
