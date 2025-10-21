<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <h1 class="text-3xl font-extrabold text-slate-800">新聞稿</h1>
    <Breadcrumb class="mt-2" :home="home" :model="model" />
    <!-- TODO: 之後把列表版面換成你要的元件 -->
    <p class="mt-6 text-slate-600">此頁面預留給「新聞稿」列表。</p>
  </div>
</template>

<script setup>
import Breadcrumb from "primevue/breadcrumb";
const home = { icon: "pi pi-home", to: { name: "home" } };
const model = [{ label: "熱門消息", to: { name: "news" } }, { label: "新聞稿" }];
</script>
