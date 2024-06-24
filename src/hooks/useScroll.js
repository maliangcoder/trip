import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore'

export default function useScroll(elRef) {
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const scrollListenerHandler = throttle(() => {
   if (el === window) {
     clientHeight.value = document.documentElement.clientHeight
     scrollTop.value = document.documentElement.scrollTop
     scrollHeight.value = document.documentElement.scrollHeight
   } else {
     clientHeight.value = el.clientHeight
     scrollHeight.value = el.scrollHeight
     scrollTop.value = el.scrollTop
   }

    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100)
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener('scroll', scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })
  return {isReachBottom, clientHeight, scrollTop, scrollHeight}
}
