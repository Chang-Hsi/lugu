<!-- src/App.vue -->
<template>
  <MobileLayout v-if="isMobile">
    <RouterView />
  </MobileLayout>

  <DefaultLayout v-else />
</template>

<script setup>
import { useDevice } from "@/composables/useDevice";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MobileLayout from "@/layouts/MobileLayout.vue";

// 使用自訂裝置偵測，行動版時切換為 MobileLayout
const { isMobile } = useDevice();
</script>
