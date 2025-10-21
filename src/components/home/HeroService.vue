<!-- src/components/HeroService.vue -->
<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-12">
      <header class="text-center">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800">便民服務</h2>
        <p class="mt-2 text-slate-500">快速入口，提升您的洽公效率</p>
      </header>

      <div class="mt-8 flex flex-wrap justify-center gap-6">
        <article
          v-for="tile in tiles"
          :key="tile.key"
          class="group w-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] xl:basis-[calc(25%-18px)] 2xl:basis-[calc(16.666%-20px)] rounded-xl shadow-md overflow-hidden"
          :style="tileStyle(tile)"
        >
          <component
            :is="tile.href ? 'a' : RouterLink"
            :href="tile.href || undefined"
            :target="tile.href ? '_blank' : undefined"
            rel="noopener noreferrer"
            :to="tile.href ? undefined : tile.to"
            class="flex h-40 md:h-44 flex-col justify-center items-center text-white px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/70 focus:ring-offset-transparent"
            :aria-label="`前往：${tile.title}`"
          >
            <span
              class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white"
            >
              <i :class="['pi', tile.icon]" class="text-2xl" aria-hidden="true"></i>
            </span>
            <div class="mt-3 text-center">
              <div class="font-bold tracking-wide">{{ tile.title }}</div>
              <div class="text-white/90 text-sm mt-1">{{ tile.subtitle }}</div>
            </div>
          </component>
        </article>
      </div>

      <div
        class="mt-8 rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 px-4 py-4"
        role="note"
        aria-label="緊急聯絡資訊"
      >
        <div
          class="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base"
        >
          <i class="pi pi-phone text-[18px]" aria-hidden="true"></i>
          <span class="font-semibold">緊急聯絡</span>
          <span class="opacity-70">｜</span>
          <span>公所總機：</span>
          <a
            href="tel:0492752001"
            class="font-semibold underline-offset-2 hover:underline"
            >049-2752-001</a
          >
          <span class="opacity-70">｜</span>
          <span>24小時服務專線：</span>
          <a
            href="tel:0492752119"
            class="font-semibold underline-offset-2 hover:underline"
            >049-2752-119</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";

/**
 * 若你尚未在專案入口引入 PrimeIcons，請加入：
 * import 'primeicons/primeicons.css'
 */

/**
 * 產生卡片背景（單色 + 漸層）
 */
function tileStyle(tile) {
  const map = {
    sky: ["#3B82F6", "#2563EB"],
    emerald: ["#10B981", "#059669"],
    rose: ["#F43F5E", "#E11D48"],
    violet: ["#8B5CF6", "#7C3AED"],
    amber: ["#F59E0B", "#D97706"],
    orange: ["#FB923C", "#F97316"],
    indigo: ["#6366F1", "#4F46E5"],
    teal: ["#14B8A6", "#0D9488"],
    cyan: ["#06B6D4", "#0891B2"],
    slate: ["#64748B", "#475569"],
  };
  const [from, to] = map[tile.color] || map.slate;
  return {
    background: `linear-gradient(135deg, ${from}, ${to})`,
  };
}

/**
 * 使用 PrimeIcons 的圖標類別（pi pi-xxx）
 * 你可以在 https://primefaces.org/primeicons/ 查到完整清單
 */
const tiles = [
  // 第 1 列
  {
    key: "traffic",
    title: "交通資訊",
    subtitle: "公車路線、停車資訊",
    to: { name: "services" },
    color: "sky",
    icon: "pi-car", // 原 CarIcon
  },
  {
    key: "spots",
    title: "景點介紹",
    subtitle: "鹿谷觀光景點導覽",
    to: { name: "about" },
    color: "emerald",
    icon: "pi-map-marker", // 原 PinIcon
  },
  {
    key: "welfare",
    title: "社會福利",
    subtitle: "補助申請、福利查詢",
    to: { name: "services-welfare" },
    color: "rose",
    icon: "pi-heart", // 原 HeartIcon
  },
  {
    key: "extensions",
    title: "分機查詢",
    subtitle: "公所各課室聯絡方式",
    to: { name: "services" },
    color: "violet",
    icon: "pi-phone", // 原 PhoneIcon
  },
  {
    key: "lamp",
    title: "路燈報修",
    subtitle: "路燈故障線上通報",
    href: "https://lulamp.lugu.gov.tw/",
    color: "amber",
    icon: "pi-bolt", // 原 BulbIcon（用閃電代表）
  },
  {
    key: "road",
    title: "道路報修",
    subtitle: "道路坑洞、設施損壞通報",
    to: { name: "online" },
    color: "orange",
    icon: "pi-directions", // 原 RoadIcon
  },

  // 第 2 列
  {
    key: "debt",
    title: "最新債務",
    subtitle: "公共債務資訊揭露",
    to: { name: "policy" },
    color: "indigo",
    icon: "pi-credit-card", // 原 CardIcon
  },
  {
    key: "faq",
    title: "常見問題",
    subtitle: "FAQ 快速解答",
    to: { name: "services" },
    color: "teal",
    icon: "pi-question-circle", // 原 HelpIcon
  },
  {
    key: "jobs",
    title: "人事徵才",
    subtitle: "職缺公告、甄選資訊",
    to: { name: "news" },
    color: "rose",
    icon: "pi-users", // 原 UsersIcon
  },
  {
    key: "apply",
    title: "證件申辦",
    subtitle: "戶政、地政線上申請",
    to: { name: "services" },
    color: "cyan",
    icon: "pi-file", // 原 FileIcon
  },
  {
    key: "meetings",
    title: "會議記錄",
    subtitle: "鄉政會議紀錄查詢",
    to: { name: "council" },
    color: "slate",
    icon: "pi-list", // 原 ClipboardIcon
  },
  {
    key: "rent",
    title: "場地租借",
    subtitle: "公共場館租借申請",
    to: { name: "services" },
    color: "emerald",
    icon: "pi-building", // 原 BuildingIcon
  },
];
</script>
