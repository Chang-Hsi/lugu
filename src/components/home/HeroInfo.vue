<!-- src/components/HeroInfo.vue -->
<template>
  <section class="mx-auto px-4 py-12" role="region" aria-label="資訊看板">
    <h2 class="text-center text-2xl md:text-3xl font-extrabold text-slate-800">
      資訊看板
    </h2>

    <!-- 卡片群：flex 佈局 + RWD -->
    <div class="mt-8 flex flex-wrap gap-6 justify-center">
      <!-- 單一卡片 -->
      <article
        v-for="card in visibleCards"
        :key="card.key"
        class="w-full sm:basis-[calc(50%-12px)] lg:basis-[calc(25%-18px)] xl:basis-[calc(20%-88px)] rounded-xl shadow-md bg-white overflow-hidden focus-within:ring-2 focus-within:ring-emerald-600"
      >
        <!-- 卡片抬頭 -->
        <header
          class="h-12 px-4 rounded-t-xl text-white flex items-center gap-2"
          :class="card.headClass"
        >
          <span aria-hidden="true" class="inline-flex">
            <component :is="card.icon" class="h-5 w-5" />
          </span>
          <RouterLink
            v-if="card.to"
            class="font-semibold hover:underline focus:outline-none focus:underline"
            :to="card.to"
            :aria-label="`前往 ${card.title} 列表頁`"
          >
            {{ card.title }}
          </RouterLink>
          <span v-else class="font-semibold">{{ card.title }}</span>
        </header>

        <!-- 列表 -->
        <div class="p-4">
          <ul class="flex flex-col">
            <li
              v-for="(item, idx) in card.items"
              :key="`${card.key}-${idx}`"
              class="py-3 border-b last:border-b-0 border-slate-200"
            >
              <RouterLink
                v-if="card.to"
                :to="card.to"
                class="group flex items-start justify-between gap-3"
              >
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <span
                      v-if="item.isNew"
                      class="inline-flex items-center rounded-full bg-red-500 text-white text-xs px-2 py-0.5"
                      aria-label="最新"
                      >NEW</span
                    >
                    <span
                      class="font-medium text-slate-900 group-hover:text-emerald-700 line-clamp-1"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                  <div class="mt-1 flex items-center gap-2 text-slate-500 text-sm">
                    <ClockIcon class="h-4 w-4" aria-hidden="true" />
                    <time :datetime="item.date">{{ item.date }}</time>
                  </div>
                </div>
              </RouterLink>

              <div v-else class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <span
                      v-if="item.isNew"
                      class="inline-flex items-center rounded-full bg-red-500 text-white text-xs px-2 py-0.5"
                      aria-label="最新"
                      >NEW</span
                    >
                    <span class="font-medium text-slate-900 line-clamp-1">
                      {{ item.title }}
                    </span>
                  </div>
                  <div class="mt-1 flex items-center gap-2 text-slate-500 text-sm">
                    <ClockIcon class="h-4 w-4" aria-hidden="true" />
                    <time :datetime="item.date">{{ item.date }}</time>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <!-- 查看更多 -->
          <div class="mt-3">
            <RouterLink
              v-if="card.to"
              :to="card.to"
              class="inline-flex items-center gap-1 text-indigo-700 font-semibold hover:underline focus:outline-none focus:underline"
              :aria-label="`查看更多 ${card.title}`"
            >
              查看更多
              <ArrowRightIcon class="h-4 w-4" aria-hidden="true" />
            </RouterLink>
            <span v-else class="inline-flex items-center gap-1 text-slate-400">
              尚未設定路由
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, RouterLink } from "vue-router";

/* ===== 簡易 Icon（純 SVG 元件） ===== */
const MegaphoneIcon = {
  props: ["class"],
  template: `<svg :class="class" viewBox="0 0 24 24" fill="currentColor"><path d="M2 8v8a2 2 0 0 0 2 2h2l6 3V3L6 6H4a2 2 0 0 0-2 2Zm14 1h2a3 3 0 1 0 0 6h2V9h-4Z"/></svg>`,
};
const AlertIcon = {
  props: ["class"],
  template: `<svg :class="class" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2V9h2v5Z"/></svg>`,
};
const CalendarIcon = {
  props: ["class"],
  template: `<svg :class="class" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 16H5V10h14v10Z"/></svg>`,
};
const ShieldIcon = {
  props: ["class"],
  template: `<svg :class="class" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"/></svg>`,
};
const LeafIcon = {
  props: ["class"],
  template: `<svg :class="class" viewBox="0 0 24 24" fill="currentColor"><path d="M5 21c7.18 0 13-5.82 13-13V4h-4C6.82 4 1 9.82 1 17v4h4Z"/></svg>`,
};
const ClockIcon = {
  props: ["class"],
  template: `<svg :class="class" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 11h5v2h-7V6h2v7Z"/></svg>`,
};
const ArrowRightIcon = {
  props: ["class"],
  template: `<svg :class="class" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6l1.41 1.41L8.83 10H20v2H8.83l2.58 2.59L10 16l-6-6 6-6Z" transform="scale(-1,1) translate(-24,0)"/></svg>`,
};
/* ===== /Icon ===== */

const router = useRouter();

/* 
  卡片資料：你可以直接在這裡串 API 後代入 items。
  routeName 對應你的路由名稱；如果不存在，卡片會被自動隱藏。
*/
const rawCards = [
  {
    key: "latest",
    title: "最新消息",
    headClass: "bg-blue-600",
    icon: MegaphoneIcon,
    routeName: "news-latest",
    items: [
      { title: "鹿谷鄉113年度預算案公告", date: "2024/03/15", isNew: true },
      { title: "道路施工公告", date: "2024/03/14" },
      { title: "公共設施維護通知", date: "2024/03/13" },
      { title: "鄉民服務中心營業時間調整", date: "2024/03/12" },
    ],
  },
  {
    key: "ann",
    title: "政令宣導",
    headClass: "bg-orange-600",
    icon: AlertIcon,
    routeName: "news-announcements",
    items: [
      { title: "防詐騙宣導活動", date: "2024/03/15", isNew: true },
      { title: "節能減碳政策推廣", date: "2024/03/14" },
      { title: "交通安全宣導", date: "2024/03/13" },
      { title: "環保回收分類說明", date: "2024/03/12" },
    ],
  },
  {
    key: "events",
    title: "活動專區",
    headClass: "bg-violet-600",
    icon: CalendarIcon,
    routeName: "news-events", // 你目前 routes 沒有此路由 → 會被自動隱藏
    items: [
      { title: "2024鹿谷茶葉節", date: "2024/04/20", isNew: true },
      { title: "社區健康講座", date: "2024/03/25" },
      { title: "農產品展售會", date: "2024/03/22" },
      { title: "文化體驗活動", date: "2024/03/20" },
    ],
  },
  {
    key: "disaster",
    title: "防災專區",
    headClass: "bg-red-600",
    icon: AlertIcon,
    routeName: "services-disaster",
    items: [
      { title: "汛期防災整備宣導", date: "2024/03/15", isNew: true },
      { title: "地震避難演練通知", date: "2024/03/10" },
      { title: "山坡地安全檢查", date: "2024/03/08" },
      { title: "防災物資儲備說明", date: "2024/03/05" },
    ],
  },
  {
    key: "sustain",
    title: "永續提升",
    headClass: "bg-green-600",
    icon: LeafIcon,
    routeName: "policy-sustainability", // 目前沒有 → 會被自動隱藏（之後你可改成存在的路由）
    items: [
      { title: "綠能發展計畫", date: "2024/03/15", isNew: true },
      { title: "生態保育推廣", date: "2024/03/12" },
      { title: "永續農業發展", date: "2024/03/10" },
      { title: "環境教育活動", date: "2024/03/08" },
    ],
  },
];

// 依 router 是否存在該 routeName 來產生可顯示卡片
const visibleCards = computed(
  () =>
    rawCards
      .map((c) => ({
        ...c,
        to: router.hasRoute(c.routeName) ? { name: c.routeName } : null,
      }))
      .filter((c) => c.to) // 若你想先顯示但不連結，可把這行改成 .filter(() => true)
);
</script>
