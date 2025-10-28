<template>
  <div class="layout">
    <SiteHeader />
    <main class="main mb-14">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from "./SiteHeaderMobile.vue";
import SiteFooter from "./SiteFooterMobile.vue";
</script>

<style scoped>
.layout {
  background: #fafafa;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
}
</style>
