<script setup>
defineProps({
  priceIntro: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
<div class="intro">
  <h2 class="title">{{ priceIntro.title }}</h2>
  <div class="content">
    {{ priceIntro.introduction }}
  </div>
</div>
</template>

<style scoped lang="less">
.intro {
  padding: 16px 12px;
  border-top: 5px solid #f2f3f4;
  .title {
    font-size: 14px;
    color: #000;
    font-weight: 700;
  }
  .content {
    margin-top: 8px;
    color: #ccc;
    font-size: 12px;
  }
}
</style>
