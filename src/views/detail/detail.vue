<script setup>
import DetailSwipe from "@/views/detail/cpns/detail-swipe.vue";
import DetailInfos from "@/views/detail/cpns/detail-infos.vue";
import DetailFacility from "@/views/detail/cpns/detail-facility.vue";
import DetailLandlord from "@/views/detail/cpns/detail-landlord.vue";
import DetailComment from "@/views/detail/cpns/detail-comment.vue";
import DetailNotice from "@/views/detail/cpns/detail-notice.vue";
import DetailMap from "@/views/detail/cpns/detail-map.vue";
import DetailIntro from "@/views/detail/cpns/detail-intro.vue";
import TabControl from "@/components/tab-control/tab-control.vue";
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/serives";
import { computed, ref, watch } from "vue";
import useScroll from "@/hooks/useScroll.js";

const route = useRoute()
const router = useRouter()
const houseId = route.params.id

// 获取house详情
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

const onClickLeft = () => {
  router.back()
}

const detailRef = ref()
const {scrollTop} = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = ({name: index}) => {
  const key = Object.keys(sectionEls.value)[index]
  let distance = sectionEls.value[key].offsetTop
  if (distance !== 0) {
    distance = distance - 44
  }
  isClick = true
  currentDistance = distance
  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
  })
}

const tabControlRef = ref()
// 页面滚动，滚动时匹配对应的tab标签
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)
  // 根据newValue匹配想到的索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  tabControlRef.value?.setCurrentTab(index)
})
</script>

<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control class="tabs" ref="tabControlRef" :titles="names" v-if="showTabControl" @tabClick="tabClick"/>
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/>
      <detail-facility name="设施" :ref="getSectionRef"
                       :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
      <detail-intro :price-intro="mainPart.introductionModule"/>
    </div>
    <div class="footer">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2a2auI-Gr38Vrxn3MS2LVa4edfkWQ5PBLMQ&usqp=CAU"
           alt="">
      <div class="text">旅途，永无止境!</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tabs {
  position: fixed;
  z-index: 19;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
