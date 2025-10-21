<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <h1 class="text-3xl font-extrabold text-slate-800">{{ title }}</h1>
    <p class="mt-4 text-slate-600">內容籌備中……</p>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const title = route.meta?.title || "便民服務";
</script>
