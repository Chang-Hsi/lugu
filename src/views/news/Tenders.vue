<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <h1 class="text-3xl font-extrabold text-slate-800">招標公告</h1>
    <Breadcrumb class="mt-2" :home="home" :model="model" />
    <p class="mt-6 text-slate-600">此頁面預留給「招標公告」列表。</p>
  </div>
</template>

<script setup>
import Breadcrumb from "primevue/breadcrumb";
const home = { icon: "pi pi-home", to: { name: "home" } };
const model = [{ label: "熱門消息", to: { name: "news" } }, { label: "招標公告" }];
</script>
