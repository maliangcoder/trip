<script setup>
defineProps({
  itemData: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image?.url" alt="">
      </div>
      <div class="info">
        <div class="location">
          <img src="https://cdn-icons-png.flaticon.com/128/535/535239.png" alt="">
          <span>{{ itemData.location }}</span>
        </div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <div class="new">¥ {{ itemData.finalPrice }}</div>
          <div class="old">¥ {{ itemData.productPrice }}</div>
          <div class="tip">{{ itemData.priceTipBadge?.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.house-item {
  width: 50%;

  .item-inner {
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }
    .info {
      padding: 8px 10px;
      color: #000;
      .location {
        padding-bottom: 5px;
        img {
          position: relative;
          top: 2px;
          width: 12px;
          height: 12px;
        }
      }

      .summary {
        font-size: 12px;
      }
      .name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .new {
          color: #ff9854;
        }

        .tip {
          padding: 0 5px;
          font-size: 12px;
          color: #fff;
          border-radius: 20px;
          background-color: #fa5455;
        }
      }
    }
  }
}
</style>
