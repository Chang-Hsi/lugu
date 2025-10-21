<template>
  <!-- 無障礙：aria-labelledby 對應標題；鍵盤可用 Tab/Enter/Space -->
  <aside class="w-56 shrink-0" role="navigation" aria-label="便民福利分類選單">
    <div class="rounded-lg border border-slate-200 bg-white overflow-hidden">
      <h2
        id="policy-sideheading"
        class="px-4 pt-3 pb-2 text-lg font-extrabold text-slate-800"
      >
        便民福利
      </h2>
      <div class="px-4">
        <div class="h-0.5 w-10 bg-emerald-700 mb-2" aria-hidden="true"></div>
      </div>

      <ul class="py-1" :aria-labelledby="'policy-sideheading'">
        <li v-for="(item, idx) in items" :key="idx">
          <RouterLink
            class="block px-4 py-3 focus:outline-none focus:bg-emerald-50 hover:bg-emerald-50"
            :class="{
              'text-emerald-700 font-semibold': isActive(item),
            }"
            :to="{ name: item.name }"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
const props = defineProps({
  items: { type: Array, required: true },
});
const route = useRoute();
function isActive(item) {
  if (!item) return false;
  const names = item.matchNames || [item.name];
  return names.includes(route.name);
}
</script>
