<!-- src/components/HeroService.vue -->
<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-12">
      <header class="text-center">
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-800">便民服務</h2>
        <p class="mt-2 text-slate-500 text-xl">快速入口，提升您的洽公效率</p>
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
              <div class="font-bold tracking-wide text-2xl">{{ tile.title }}</div>
              <div class="text-white/90 text-lg mt-1">{{ tile.subtitle }}</div>
            </div>
          </component>
        </article>
      </div>

      <section ref="fbSection" class="mt-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="rounded-xl border border-slate-200 p-4">
            <div
              class="fb-page"
              data-href="https://www.facebook.com/LuguOffice"
              data-tabs="timeline"
              data-width="500"
              data-height=""
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            ></div>
          </div>

          <!-- 請調整這裡，目前只有一個貼文連結，請改為顯示多個，資料來自postLinks，由左到右排列，超出時換行，並且固定寬高，總高度需與左邊相同 -->
          <div class="rounded-xl border border-slate-200 p-4">
            <div
              class="fb-post"
              data-href="https://www.facebook.com/photo.php?fbid=1211190037705501&set=a.343066877851159&type=3"
              data-width="500"
              data-show-text="true"
              data-adapt-container-width="true"
            ></div>
          </div>
        </div>
      </section>

      <!-- youtube影片嵌入 -->
      <section class="mt-12">
        <div class="rounded-xl border border-slate-200 overflow-hidden">
          <div class="relative w-full pb-[56.25%]">
            <iframe
              class="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/HH0LDcch21Y"
              title="YouTube video"
              loading="lazy"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </section>

      <div
        class="mt-8 rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 px-4 py-4"
        role="note"
        aria-label="緊急聯絡資訊"
      >
        <div class="flex flex-wrap items-center justify-center gap-3 text-lg md:text-xl">
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
/*
  嵌入 Facebook 外掛注意事項（已在本檔處理）：
  1) 動態載入 FB SDK（zh_TW），只載一次（以 script#facebook-jssdk 判斷）。
  2) SDK 讀取後，呼叫 window.FB.XFBML.parse(fbSectionEl) 解析該區塊 XFBML。
  3) data-adapt-container-width="true" 可隨容器寬度自適應；若寬度不對可以調 data-width。
  4) 你提供的網址我已放進去：
     - 粉專： https://www.facebook.com/LuguOffice
     - 相片： https://www.facebook.com/photo.php?fbid=1211190037705501&set=a.343066877851159&type=3
*/

import { ref, onMounted, nextTick } from "vue";
import { RouterLink } from "vue-router";

/** 產生卡片背景（單色 + 漸層） */
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
  return { background: `linear-gradient(135deg, ${from}, ${to})` };
}

/** 使用 PrimeIcons 的圖標類別（pi pi-xxx） */
const tiles = [
  {
    key: "traffic",
    title: "交通資訊",
    subtitle: "公車路線、停車資訊",
    to: { name: "services" },
    color: "sky",
    icon: "pi-car",
  },
  {
    key: "spots",
    title: "景點介紹",
    subtitle: "鹿谷觀光景點導覽",
    to: { name: "about" },
    color: "emerald",
    icon: "pi-map-marker",
  },
  {
    key: "welfare",
    title: "社會福利",
    subtitle: "補助申請、福利查詢",
    to: { name: "services-welfare" },
    color: "rose",
    icon: "pi-heart",
  },
  {
    key: "extensions",
    title: "分機查詢",
    subtitle: "公所各課室聯絡方式",
    to: { name: "services" },
    color: "violet",
    icon: "pi-phone",
  },
  {
    key: "lamp",
    title: "路燈報修",
    subtitle: "路燈故障線上通報",
    href: "https://lulamp.lugu.gov.tw/",
    color: "amber",
    icon: "pi-bolt",
  },
  {
    key: "road",
    title: "道路報修",
    subtitle: "道路坑洞、設施損壞通報",
    to: { name: "online" },
    color: "orange",
    icon: "pi-directions",
  },
  {
    key: "debt",
    title: "最新債務",
    subtitle: "公共債務資訊揭露",
    to: { name: "policy" },
    color: "indigo",
    icon: "pi-credit-card",
  },
  {
    key: "faq",
    title: "常見問題",
    subtitle: "FAQ 快速解答",
    to: { name: "services" },
    color: "teal",
    icon: "pi-question-circle",
  },
  {
    key: "jobs",
    title: "人事徵才",
    subtitle: "職缺公告、甄選資訊",
    to: { name: "news" },
    color: "rose",
    icon: "pi-users",
  },
  {
    key: "apply",
    title: "證件申辦",
    subtitle: "戶政、地政線上申請",
    to: { name: "services" },
    color: "cyan",
    icon: "pi-file",
  },
  {
    key: "meetings",
    title: "會議記錄",
    subtitle: "鄉政會議紀錄查詢",
    to: { name: "council" },
    color: "slate",
    icon: "pi-list",
  },
  {
    key: "rent",
    title: "場地租借",
    subtitle: "公共場館租借申請",
    to: { name: "services" },
    color: "emerald",
    icon: "pi-building",
  },
];

/* ===== Facebook Embed 邏輯 ===== */
const fbSection = ref(null);

/* 貼文牆連結（可增刪） */
const postLinks = ref([
  "https://www.facebook.com/photo.php?fbid=1211190037705501&set=a.343066877851159&type=3",
  "https://www.facebook.com/photo/?fbid=1205003691670801&set=a.618732866964556",
  "https://www.facebook.com/photo/?fbid=1204977825006721&set=a.618732866964556",
  "https://www.facebook.com/photo/?fbid=1204152361755934&set=a.618732866964556",
  "https://www.facebook.com/photo/?fbid=1203346135169890&set=a.618732866964556",
]);

function ensureFbRoot() {
  if (!document.getElementById("fb-root")) {
    const div = document.createElement("div");
    div.id = "fb-root";
    document.body.prepend(div);
  }
}

function loadFacebookSDK(locale = "zh_TW") {
  return new Promise((resolve) => {
    if (window.FB) {
      resolve(window.FB);
      return;
    }
    if (document.getElementById("facebook-jssdk")) {
      const check = () => (window.FB ? resolve(window.FB) : setTimeout(check, 50));
      check();
      return;
    }
    ensureFbRoot();
    const js = document.createElement("script");
    js.id = "facebook-jssdk";
    js.async = true;
    js.defer = true;
    js.crossOrigin = "anonymous";
    js.src = `https://connect.facebook.net/${locale}/sdk.js#xfbml=1&version=v20.0`;
    js.onload = () => resolve(window.FB);
    document.body.appendChild(js);
  });
}

async function renderFbWidgets() {
  await nextTick();
  const FB = await loadFacebookSDK();
  if (FB && fbSection.value) {
    FB.XFBML.parse(fbSection.value);
  }
}

onMounted(() => {
  renderFbWidgets();
});
</script>
