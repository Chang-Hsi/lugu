import { ref, onUnmounted } from 'vue'

export function useDevice() {
  const isMobile = ref(false)
  const mq = window.matchMedia('(max-width: 1023px)')
  const update = () => { isMobile.value = mq.matches }
  update()
  if (mq.addEventListener) mq.addEventListener('change', update)
  else mq.addListener(update)
  onUnmounted(() => {
    if (mq.removeEventListener) mq.removeEventListener('change', update)
    else mq.removeListener(update)
  })
  return { isMobile }
}
