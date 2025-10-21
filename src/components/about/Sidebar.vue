<template>
  <!-- 關於鹿谷：分類選單 -->
  <aside class="w-56 shrink-0" aria-label="關於鹿谷分類選單">
    <nav
      class="flex flex-col rounded-lg border border-slate-200 bg-white overflow-hidden"
      role="navigation"
      :aria-labelledby="headingId"
    >
      <!-- 標題 -->
      <div class="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h2 :id="headingId" class="text-lg font-bold text-slate-800">關於鹿谷</h2>
        <div class="mt-2 h-0.5 w-16 bg-emerald-700" aria-hidden="true"></div>
      </div>

      <!-- 目錄 -->
      <ul class="py-1">
        <li v-for="item in safeItems" :key="item.label">
          <RouterLink
            class="block px-4 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            :to="item.to"
            :aria-current="isActive(item) ? 'page' : undefined"
            :class="[
              isActive(item)
                ? 'text-emerald-700 font-semibold bg-emerald-50'
                : 'text-slate-800 hover:bg-emerald-50',
            ]"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

/**
 * props.items 格式：
 * [{ label: '鹿谷簡介', to: { name: 'about-overview' }, matchNames: ['about-overview'] }, ...]
 * matchNames 可選；若未提供則用 to.name 當比對
 */
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  headingId: {
    type: String,
    default: "about-sidebar-heading",
  },
});

const route = useRoute();

const safeItems = computed(() =>
  (props.items || []).map((i) => ({
    ...i,
    matchNames:
      i.matchNames && i.matchNames.length
        ? i.matchNames
        : i.to && i.to.name
        ? [i.to.name]
        : [],
  }))
);

function isActive(item) {
  if (!item || !item.matchNames) return false;
  // 比對目前 route.name 是否在宣告的 matchNames 內
  return item.matchNames.includes(route.name);
}
</script>
