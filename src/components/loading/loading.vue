<script setup>

import useMainStore from "@/stores/modules/main.js";
import {storeToRefs} from "pinia";

const mainStore = useMainStore()

const loadingClick = () => {
  mainStore.isLoading = false
}
</script>

<template>
  <div
      class="loading"
      v-if="mainStore.isLoading"
      @click="loadingClick"
  >
   <div class="bg">
     <img src="https://media1.giphy.com/media/VHOF8pfPZOt9p018zw/giphy.webp?cid=ecf05e47csf9ukjlvojpogpi3ohhz7as6zfv5kfh41ngtwle&ep=v1_gifs_search&rid=giphy.webp&ct=g" alt="">
   </div>
  </div>
</template>

<style scoped lang="less">
.loading {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .2);

  .bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 104px;
    height: 104px;
    border-radius: 10px;
    background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCt_LeCqFFa8kLC3Wzoltabv-R7ZKk99BnSQ&usqp=CAU') 0 0 / 100% 100% ;


    img {
      width: 70px;
      height: 70px;
    }
  }
}
</style>
