<!-- src/layouts/DefaultHeader.vue -->
<template>
  <header id="header" class="w-full">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 px-4 py-2 rounded bg-yellow-400 text-slate-900"
    >
      跳至主內容
    </a>

    <div
      class="w-full bg-emerald-800 text-white text-base"
      role="region"
      aria-label="無障礙快速鍵說明列"
    >
      <div class="mx-auto max-w-7xl px-4 py-1 flex items-center justify-between gap-4">
        <p>
          無障礙快速鍵：Alt+U(上方功能) Alt+C(中央內容) Alt+S(下方功能) Alt+Z(網站導覽)
        </p>
        <nav class="hidden sm:flex items-center gap-3" aria-label="網站輔助選單">
          <span class="inline-flex items-center gap-1">
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm6.93 9h-3.11A12.9 12.9 0 0 0 14.77 6a8 8 0 0 1 4.16 5ZM9.9 6c.67-.1 1.37-.15 2.1-.15s1.43.05 2.1.15a12.9 12.9 0 0 1 1.42 5H8.48A12.9 12.9 0 0 1 9.9 6ZM7.29 4a8 8 0 0 0-4.22 7h3.11c.27-2.13.93-4.01 2-5.65A8 8 0 0 0 7.29 4ZM6.18 13H3.07a8 8 0 0 0 4.22 7 12.9 12.9 0 0 1-1.11-7Zm2.47 0h6.7a12.9 12.9 0 0 1-1.43 5 15.9 15.9 0 0 1-3.84 0 12.9 12.9 0 0 1-1.43-5Zm8.15 0c.13 2.43-.31 4.85-1.24 7a8 8 0 0 0 4.17-7h-2.93Z"
              />
            </svg>
            <span class="whitespace-nowrap">中文</span>
          </span>
          <span class="opacity-70" aria-hidden="true">|</span>
          <RouterLink
            class="hover:underline focus:outline-none focus:underline"
            :to="{ name: 'home' }"
            hreflang="en"
          >
            English
          </RouterLink>
          <span class="opacity-70" aria-hidden="true">|</span>
          <RouterLink
            class="hover:underline focus:outline-none focus:underline"
            :to="{ name: 'sitemap' }"
            accesskey="Z"
            aria-describedby="ak-z"
          >
            網站導覽
          </RouterLink>
          <span id="ak-z" class="sr-only">此連結 Accesskey 為 Alt+Z</span>
        </nav>
      </div>
    </div>

    <div class="w-full bg-white">
      <div class="mx-auto max-w-7xl px-4 py-4">
        <div class="flex items-center justify-between gap-4">
          <RouterLink
            :to="{ name: 'home' }"
            class="flex items-center gap-4 min-w-0 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-md"
            aria-label="回首頁：南投縣鹿谷鄉公所"
          >
            <img
              src="/public/logo.png"
              alt="鹿谷鄉公所標誌"
              class="h-14 w-14 rounded-full object-cover shrink-0"
            />
            <div class="flex flex-col min-w-0">
              <h1 class="text-3xl sm:text-4xl font-extrabold text-emerald-900 truncate">
                南投縣鹿谷鄉公所
              </h1>
              <p class="text-lg text-slate-600">Lugu Township Office, Nantou County</p>
            </div>
          </RouterLink>

          <form
            class="hidden md:flex items-center justify-end"
            role="search"
            :action="searchAction"
            method="GET"
            aria-label="站內搜尋"
          >
            <label for="site-search" class="sr-only">輸入關鍵字</label>
            <div class="relative w-[360px] max-w-[50vw]">
              <span class="absolute inset-y-0 left-3 flex items-center">
                <svg
                  class="h-4 w-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M21 20.586 16.657 16.24A8 8 0 1 0 18 18.586L22.586 23 21 20.586ZM4 10a6 6 0 1 1 12 0A6 6 0 0 1 4 10Z"
                  />
                </svg>
              </span>
              <input
                id="site-search"
                name="q"
                type="search"
                inputmode="search"
                autocomplete="off"
                placeholder="搜尋網站內容…"
                class="w-full rounded-full bg-slate-100 pl-9 pr-12 py-3 text-xl placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="submit"
                class="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-xl bg-emerald-700 text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                搜尋
              </button>
            </div>
          </form>

          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center rounded-lg h-10 w-10 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            :aria-expanded="String(menuOpen)"
            :aria-controls="'primary-nav'"
            @click="menuOpen = !menuOpen"
          >
            <span class="sr-only">開啟主選單</span>
            <svg
              v-if="!menuOpen"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M18.3 5.71 12 12.01l-6.29-6.3-1.42 1.42 6.3 6.29-6.3 6.29 1.42 1.42 6.29-6.3 6.29 6.3 1.42-1.42-6.3-6.29 6.3-6.29-1.42-1.42Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="border-t border-slate-200 hidden md:block">
        <div class="mx-auto max-w-7xl px-4 relative">
          <nav
            id="primary-nav"
            class="h-12 flex items-center gap-6 text-slate-800 text-xl"
            aria-label="主選單"
            role="menubar"
          >
            <div
              v-for="(m, i) in menus"
              :key="m.label"
              class="relative group"
              @mouseenter="openIndex = i"
              @mouseleave="openIndex = -1"
            >
              <RouterLink
                class="inline-flex items-center gap-1 px-1 py-2 hover:text-emerald-700 focus:outline-none focus:text-emerald-700"
                :to="m.to"
                role="menuitem"
                :aria-haspopup="m.items?.length ? 'true' : 'false'"
                :aria-expanded="openIndex === i ? 'true' : 'false'"
              >
                <span>{{ m.label }}</span>
                <svg
                  v-if="m.items?.length"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </RouterLink>

              <div
                v-if="m.items?.length"
                class="absolute left-0 top-full z-50 hidden group-hover:flex group-focus-within:flex"
                :class="openIndex === i ? 'flex' : ''"
              >
                <div
                  class="mt-1 min-w-[200px] rounded-md border border-slate-200 bg-white shadow-lg overflow-hidden"
                  role="menu"
                  :aria-label="m.label + ' 子選單'"
                >
                  <RouterLink
                    v-for="it in m.items"
                    :key="it.label"
                    :to="it.to"
                    role="menuitem"
                    class="block px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:bg-emerald-50 whitespace-nowrap text-xl"
                  >
                    {{ it.label }}
                  </RouterLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="h-[2px] bg-amber-800"></div>
      </div>

      <div v-show="menuOpen" class="md:hidden border-t border-slate-200">
        <div
          class="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3"
          role="dialog"
          aria-label="行動版主選單"
        >
          <form
            class="flex items-stretch"
            role="search"
            :action="searchAction"
            method="GET"
            aria-label="站內搜尋（行動版）"
          >
            <label for="m-site-search" class="sr-only">輸入關鍵字</label>
            <div class="relative flex-1">
              <span class="absolute inset-y-0 left-3 flex items-center">
                <svg
                  class="h-4 w-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M21 20.586 16.657 16.24A8 8 0 1 0 18 18.586L22.586 23 21 20.586ZM4 10a6 6 0 1 1 12 0A6 6 0 0 1 4 10Z"
                  />
                </svg>
              </span>
              <input
                id="m-site-search"
                name="q"
                type="search"
                inputmode="search"
                autocomplete="off"
                placeholder="搜尋網站內容…"
                class="w-full rounded-full bg-slate-100 pl-9 pr-24 py-3 text-xl placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="submit"
                class="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-xl bg-emerald-700 text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                搜尋
              </button>
            </div>
          </form>

          <nav class="flex flex-col text-xl" aria-label="主選單（行動版）">
            <RouterLink
              class="py-2 text-slate-800 hover:text-emerald-700 focus:outline-none focus:text-emerald-700"
              :to="{ name: 'news' }"
              >熱門消息</RouterLink
            >
            <RouterLink
              class="py-2 text-slate-800 hover:text-emerald-700 focus:outline-none focus:text-emerald-700"
              :to="{ name: 'about' }"
              >關於鹿谷</RouterLink
            >
            <RouterLink
              class="py-2 text-slate-800 hover:text-emerald-700 focus:outline-none focus:text-emerald-700"
              :to="{ name: 'policy' }"
              >法規政策</RouterLink
            >
            <RouterLink
              class="py-2 text-slate-800 hover:text-emerald-700 focus:outline-none focus:text-emerald-700"
              :to="{ name: 'services' }"
              >便民服務</RouterLink
            >
            <RouterLink
              class="py-2 text-slate-800 hover:text-emerald-700 focus:outline-none focus:text-emerald-700"
              :to="{ name: 'council' }"
              >代表會</RouterLink
            >
            <RouterLink
              class="py-2 text-slate-800 hover:text-emerald-700 focus:outline-none focus:text-emerald-700"
              :to="{ name: 'online' }"
              >線上服務交流</RouterLink
            >
            <div
              class="mt-1 flex items-center gap-3 text-lg text-slate-700 pt-2 border-t"
            >
              <span class="inline-flex items-center gap-1">
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Z" />
                </svg>
                中文
              </span>
              <span class="opacity-60" aria-hidden="true">|</span>
              <RouterLink
                class="hover:underline focus:outline-none focus:underline"
                :to="{ name: 'home' }"
                hreflang="en"
                >English</RouterLink
              >
              <span class="opacity-60" aria-hidden="true">|</span>
              <RouterLink
                class="hover:underline focus:outline-none focus:underline"
                :to="{ name: 'sitemap' }"
                >網站導覽</RouterLink
              >
            </div>
          </nav>
        </div>
        <div class="h-[2px] bg-amber-800"></div>
      </div>
    </div>
  </header>
</template>

<script setup>
// 取代：原本有 `import { getTopMenuItems } from "@/router"`
import { ref } from "vue";
import { RouterLink } from "vue-router";

// 行為狀態
const menuOpen = ref(false);
const searchAction = "/search";
const openIndex = ref(-1);

// 改為在此手動管理選單（名稱請與你的路由 name 對應）
const menus = ref([
  {
    label: "熱門消息",
    to: { name: "news" },
    items: [
      { label: "最新消息", to: { name: "news-latest" } },
      { label: "新聞稿", to: { name: "news-press" } },
      { label: "招標公告", to: { name: "news-tenders" } },
      { label: "徵才公告", to: { name: "news-jobs" } },
      { label: "活動訊息", to: { name: "news-events" } },
    ],
  },
  {
    label: "關於本鄉",
    to: { name: "about" },
    items: [
      { label: "鹿谷簡介", to: { name: "about-overview" } },
      { label: "公所介紹", to: { name: "about-introduce" } },
      { label: "觀光景點", to: { name: "about-geography" } },
      { label: "特產介紹", to: { name: "about-specialty" } },
      { label: "交通運輸", to: { name: "about-traffic" } },
      { label: "行政區域", to: { name: "about-districts" } },
      { label: "課室分機", to: { name: "about-departments" } },
      { label: "行政區域圖", to: { name: "about-districts" } },
      { label: "鄉志", to: { name: "about-chronicle" } },
    ],
  },
  {
    label: "法規政策",
    to: { name: "policy" },
    items: [
      { label: "政策相關", to: { name: "policy-related" } },
      { label: "年度經費", to: { name: "policy-annual-expense" } },
      { label: "資訊公開", to: { name: "policy-open" } },
      { label: "廉政園地", to: { name: "policy-integrity" } },
      { label: "施工工程", to: { name: "policy-construction" } },
      { label: "最新債務訊息", to: { name: "policy-debt" } },
      { label: "災後復建審議", to: { name: "policy-post-disaster" } },
      { label: "永續提升人行安全計畫", to: { name: "policy-pedestrian-safety" } },
    ],
  },
  {
    label: "便民服務",
    to: { name: "services" },
    items: [
      { label: "社會福利", to: { name: "services-welfare" } },
      { label: "防災專區", to: { name: "services-disaster" } },
      { label: "兵役資訊", to: { name: "services-military" } },
      { label: "鄉立幼兒園", to: { name: "services-kindergarten" } },
      { label: "鹿谷鄉銘思堂", to: { name: "services-grace-hall" } },
      { label: "相關連結", to: { name: "services-links" } },
      { label: "常見問題", to: { name: "services-faq" } },
      { label: "鹿谷鄉立圖書館", to: { name: "services-library" } },
      {
        label: "公職人員利益衝突迴避法身分關係公開專區",
        to: { name: "services-conflict" },
      },
    ],
  },
  {
    label: "代表會",
    to: { name: "council" },
    items: [
      { label: "鄉民代表會", to: { name: "council-assembly" } },
      { label: "出國考察報告", to: { name: "council-overseas-reports" } },
      { label: "代表會活動", to: { name: "council-activities" } },
      { label: "會議資訊", to: { name: "council-meetings" } },
    ],
  },
  {
    label: "線上服務交流",
    to: { name: "online" },
  },
]);
</script>
