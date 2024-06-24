<script setup>
import tabbarData from "@/assets/data/tabbar.js";
import {getAssetURL} from "@/utils/load_assets_img.js";
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const currentIndex = ref(0)
const router = useRouter()
const itemClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path)
}
</script>

<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData" :key="item.text">
      <div
          class="tab-bar-item"
          :class="{ active: currentIndex === index }"
          @click="itemClick(index,item)"
      >
        <img :src="getAssetURL(item.image)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;

  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
      color: var(--primary-color);
    }

    .text {
      font-size: 12px;
    }

    img {
      width: 36px;
    }
  }
}

</style>
