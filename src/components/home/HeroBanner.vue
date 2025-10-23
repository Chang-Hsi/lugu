<!-- src/components/HeroBanner.vue -->
<template>
  <section
    class="relative w-full h-[580px] md:h-[680px] overflow-hidden"
    role="region"
    aria-label="焦點圖輪播"
    tabindex="0"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <img
      v-for="(s, i) in slides"
      :key="s.id"
      :src="s.src"
      :alt="s.alt"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
      :class="i === current ? 'opacity-100' : 'opacity-0'"
      decoding="async"
      fetchpriority="high"
    />
    <div class="absolute inset-0 bg-black/45" aria-hidden="true"></div>

    <div
      class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
    >
      <h2
        class="text-white text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow"
      >
        {{ slides[current].title }}
      </h2>
      <p class="mt-4 text-white/90 text-xl md:text-2xl">
        {{ slides[current].subtitle }}
      </p>

      <RouterLink
        v-if="slides[current].to"
        :to="slides[current].to"
        class="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-emerald-600 px-6 font-semibold text-white shadow-lg hover:bg-emerald-700 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xl"
      >
        {{ slides[current].btnText }}
      </RouterLink>
      <button
        v-else
        type="button"
        class="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-emerald-600 px-6 font-semibold text-white shadow-lg hover:bg-emerald-700 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xl"
      >
        {{ slides[current].btnText }}
      </button>
    </div>

    <button
      type="button"
      class="absolute left-6 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white"
      @click="prev"
      aria-label="上一張"
    >
      <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    </button>

    <button
      type="button"
      class="absolute right-6 top-1/2 z-10 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white"
      @click="next"
      aria-label="下一張"
    >
      <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    </button>

    <div
      class="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2"
    >
      <button
        v-for="(s, i) in slides"
        :key="`dot-${s.id}`"
        type="button"
        class="h-2 w-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
        :class="i === current ? 'bg-white' : 'bg-white/60'"
        @click="go(i)"
        :aria-label="`跳到第 ${i + 1} 張：${s.title}`"
        :aria-current="i === current ? 'true' : undefined"
      />
    </div>

    <div class="absolute bottom-0 left-0 right-0 z-10">
      <div class="bg-linear-to-r from-blue-600 to-teal-500 text-white">
        <div class="mx-auto max-w-7xl px-4 py-4">
          <div class="flex items-center justify-between gap-6">
            <div class="flex items-center gap-8">
              <div class="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
                  />
                </svg>
                <span class="font-medium text-xl">鹿谷鄉</span>
              </div>

              <div class="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  class="h-7 w-7"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M6 19a4 4 0 1 1 0-8 5 5 0 0 1 9.584-1.003A4.5 4.5 0 1 1 18.5 19H6Z"
                  />
                </svg>
                <div class="flex items-baseline gap-3">
                  <span class="text-4xl font-extrabold">25°C</span>
                  <span class="text-lg">多雲</span>
                </div>
              </div>

              <div class="hidden md:flex items-center gap-6 text-lg opacity-90">
                <span>濕度：68%</span>
                <span>風速：3.2 km/h</span>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    class="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 15H5V10h14v9Z"
                    />
                  </svg>
                  <span class="font-semibold text-xl">鄉長行程</span>
                </div>
                <div class="mt-1 text-lg opacity-90">今日：社區發展會議</div>
              </div>

              <button
                class="rounded-full bg-white px-4 py-2 font-semibold text-blue-600 shadow hover:bg-blue-50 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-white text-xl"
              >
                查看完整行程
              </button>

              <button
                class="rounded-full bg-white px-4 py-2 font-semibold text-emerald-600 shadow hover:bg-blue-50 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-white text-xl"
                @click="lineDialogVisible = true"
              >
                加LINE好友
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加 LINE 好友：PrimeVue Dialog -->
    <Dialog
      v-model:visible="lineDialogVisible"
      modal
      :draggable="false"
      :dismissableMask="true"
      :closable="true"
      :style="{ width: '480px' }"
      header="加入 LINE 好友"
    >
      <div class="flex flex-col items-center gap-4 px-1 py-1 pb-5">
        <img
          :src="qrUrl"
          alt="LINE 加好友 QR Code"
          class="w-56 h-56 rounded-md border border-slate-200 bg-white object-contain"
        />
        <div class="text-center">
          <div class="text-base text-slate-600">掃描上方 QR Code 加入好友</div>
        </div>

        <div v-if="copied" class="text-emerald-600 text-sm">已複製到剪貼簿</div>
      </div>
    </Dialog>
  </section>
</template>

<script setup>
/*
  這段為原有輪播邏輯，未改動；下方新增了：
  1) lineDialogVisible：控制彈窗顯示
  2) LINE_ID / addFriendUrl / qrUrl：LINE 假 ID、加好友連結與 QR 圖片來源
     - qrUrl 使用免費 QR 產生服務 api.qrserver.com（免安裝套件）
     - 若未來要本地產生，可改用 'qrcode' 套件產生 dataURL
  3) copyLineId()：複製 LINE ID
  4) openAddFriend()：用戶在手機上可直接開啟 LINE 加好友（瀏覽器也會導到對應頁）
*/
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const slides = ref([
  {
    id: 1,
    src:
      "https://tlife.thsrc.com.tw/s3/post/20210723-t5M5zqdr5e14rvkONIxXpSNd1iSqlbr3tDG4FKCW.jpg",
    alt: "鹿谷茶葉節活動現場",
    title: "2024鹿谷茶葉節盛大開幕",
    subtitle: "體驗在地茶文化，品味鹿谷茶香",
    btnText: "了解更多",
    to: null,
  },
  {
    id: 3,
    src:
      "https://www.lugu.gov.tw:442//FilesLoader/EntancetImage/201910231301521081023.JPG",
    alt: "茶園日出",
    title: "鹿谷高山茶・得天獨厚",
    subtitle: "雲霧繚繞、日夜溫差孕育的好滋味",
    btnText: "探索茶鄉",
    to: null,
  },
  {
    id: 4,
    src: "https://itaiwan.moe.gov.tw/upfd/2019race/map/RC-190726-071131.jpg",
    alt: "在地市集與人文風情",
    title: "人文風情・友善小鎮",
    subtitle: "慢城步調，感受熱情與溫度",
    btnText: "看更多",
    to: null,
  },
]);

const current = ref(0);
const intervalMs = 3000;
let timer = /** @type {ReturnType<typeof setInterval> | null} */ (null);

const prefersReducedMotion =
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
const autoPlay = ref(!prefersReducedMotion);

function next() {
  current.value = (current.value + 1) % slides.value.length;
}
function prev() {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length;
}
function go(i) {
  current.value = i;
}
function start() {
  stop();
  if (!autoPlay.value) return;
  timer = setInterval(next, intervalMs);
}
function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
function pause() {
  stop();
}
function resume() {
  start();
}
onMounted(start);
onBeforeUnmount(stop);

/* ====== 新增：LINE 好友彈窗邏輯 ====== */
const lineDialogVisible = ref(false);

/* 假的 LINE 官方帳號 ID（或個人 ID），若要真實值請改這裡 */
const LINE_ID = "@lugu1234";

/*
  官方常見加好友連結格式：
  - 官方帳號（有 @）：https://line.me/R/ti/p/@你的ID
  - 若未來要改為 line://ti/p/@你的ID 也可嘗試（行動裝置優先）
*/
const addFriendUrl = `https://line.me/R/ti/p/${encodeURIComponent(LINE_ID)}`;

/* 使用線上 QR 產生服務（免裝套件）；240x240 可自行調整 */
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
  addFriendUrl
)}`;

const copied = ref(false);
async function copyLineId() {
  try {
    await navigator.clipboard.writeText(LINE_ID);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch (err) {
    copied.value = false;
    window.open(addFriendUrl, "_blank");
  }
}

function openAddFriend() {
  window.open(addFriendUrl, "_blank");
}
</script>
