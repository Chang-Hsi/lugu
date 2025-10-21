<template>
  <!-- 外層用 aside，父層可直接套寬度/顯示控制 -->
  <aside :class="rootClass" aria-labelledby="news-side-nav-title">
    <!-- 標題（aria-labelledby 目標） -->
    <h2 id="news-side-nav-title" class="px-4 pt-4 text-xl font-bold text-slate-800">
      熱門消息
    </h2>

    <!-- 標題下細線（左側綠色重點線） -->
    <div class="px-4 mt-2">
      <div class="h-[2px] bg-slate-200">
        <div class="h-[2px] w-16 bg-emerald-700"></div>
      </div>
    </div>

    <!-- 導覽清單 -->
    <nav class="mt-3" aria-label="熱門消息分類選單">
      <ul
        role="list"
        class="flex flex-col rounded-lg border border-slate-200 bg-white overflow-hidden"
      >
        <li
          v-for="item in items"
          :key="item.name"
          class="border-b last:border-b-0 border-slate-200"
        >
          <RouterLink
            :to="{ name: item.name }"
            class="block px-4 py-3 text-slate-700 hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none"
            :class="{
              'text-emerald-700 font-semibold': $route.name === item.name,
            }"
            :aria-current="$route.name === item.name ? 'page' : undefined"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
/**
 * 無障礙：
 * - <aside> 容器 + aria-labelledby 對應標題
 * - <nav aria-label="..."> 指定導覽語義
 * - <ul role="list">、<li> 結構化
 * - 當前頁面連結加 aria-current="page"
 * - 焦點樣式由 Tailwind + :focus:bg-* 提供
 */
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  /**
   * 導覽項目
   * 預設已放：最新消息／新聞稿／招標公告／徵才公告／活動訊息
   * name 請對應你的 router 名稱
   */
  items: {
    type: Array,
    default: () => [
      { label: "最新消息", name: "news-latest" },
      { label: "新聞稿", name: "news-press" },
      { label: "招標公告", name: "news-tenders" },
      { label: "徵才公告", name: "news-jobs" },
      { label: "活動訊息", name: "news-events" },
    ],
  },
  /**
   * 外層附加 class（給父層控制寬度/顯示斷點）
   */
  class: {
    type: String,
    default: "",
  },
});

const route = useRoute();

// 讓父層傳入的 class 可以套到 <aside> 上（像 "hidden lg:block w-56 shrink-0"）
const rootClass = computed(() => props.class);
</script>
