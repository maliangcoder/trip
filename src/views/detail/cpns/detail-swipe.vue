<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

// 对数据进行转换
const swiperGroup = {}
for (const item of props.swipeData) {
  let valueArray = swiperGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swiperGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

// 转换数据的方法
const nameReg = /【(.*?)】/i
const getName = (name) => {
  const result = nameReg.exec(name)
  return result[1]
}

const getCategoryIndex = (item) => {
  const valueArray = swiperGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}

</script>

<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swiperGroup" :key="key">
          <span class="item" :class="{active: swipeData[active]?.enumPictureCategory == key }">
            <span class="text">{{ getName(value[0].title) }}</span>
            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">{{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}</span>
          </span>
          </template>
        </div>
      </template>

    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.swipe-list {
  .item {
    img {
      width: 100%;
    }
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);

    .item {
      margin: 0 3px;

      &.active {
        padding: 0 3px;
        border-radius: 2px;
        background-color: #fff;
        color: #333;
      }
    }
  }
}
</style>
