<script setup>
import { ref } from "vue";

defineProps({
  titles: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits('tabClick')

const active = ref()
const onClickTab = ({ name, title }) => {
  emit('tabClick', { name, title })
}

const setCurrentTab = (index) => {
  active.value = index
}

defineExpose({ setCurrentTab })
</script>

<template>
  <div class="tab-control">
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <template v-for="(item, index) in titles" :key="index">
        <van-tab :title="item"/>
      </template>

    </van-tabs>
  </div>
</template>

<style scoped lang="less">

</style>
