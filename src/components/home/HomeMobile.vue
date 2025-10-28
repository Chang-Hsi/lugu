<!-- src/components/HomeHero.vue -->
<template>
  <section class="w-full">
    <img
      src="https://www.lugu.gov.tw:442//FilesLoader/EntancetImage/201910231301521081023.JPG"
      alt="鹿谷風景"
      class="w-full h-48 md:h-72 object-cover"
      decoding="async"
      fetchpriority="high"
    />
  </section>

  <section
    class="relative w-full h-[80svh] sm:h-screen overflow-hidden"
    tabindex="0"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
  >
    <div
      v-for="(s, i) in slides"
      :key="s.id"
      class="absolute inset-0 transition-opacity duration-700"
      :class="i === current ? 'opacity-100' : 'opacity-0'"
    >
      <img :src="s.src" :alt="s.alt" class="w-full h-full object-cover" loading="lazy" />
      <div class="absolute inset-0 bg-black/40"></div>

      <div class="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div class="text-center text-white max-w-4xl">
          <h2 class="text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow">
            {{ s.title }}
          </h2>
          <p class="mt-2 text-lg sm:text-2xl opacity-90">{{ s.subtitle }}</p>
          <div class="mt-4">
            <Button
              v-if="s.btnText"
              :label="s.btnText"
              class="bg-white! text-slate-800! border-0! px-5! py-2.5! rounded-full! font-bold shadow"
            />
          </div>
        </div>
      </div>
    </div>

    <button
      class="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center"
      aria-label="上一張"
      @click="prev"
    >
      <i class="pi pi-angle-left text-slate-700 text-base md:text-lg"></i>
    </button>
    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center"
      aria-label="下一張"
      @click="next"
    >
      <i class="pi pi-angle-right text-slate-700 text-base md:text-lg"></i>
    </button>
  </section>

  <section class="w-full bg-linear-to-r from-sky-500 to-teal-400 text-white">
    <div class="mx-auto max-w-7xl px-4 py-3">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 whitespace-nowrap">
            <i class="pi pi-map-marker text-white/95"></i>
            <span class="text-white/95">{{ weather.location }}</span>
            <i class="pi pi-cloud text-white/95"></i>
            <span class="text-2xl md:text-3xl font-extrabold tracking-wide"
              >{{ weather.temp }}°C</span
            >
          </div>
          <div class="flex items-center justify-center gap-6 text-sm">
            <span class="text-sm text-white/95">{{ weather.condition }}</span>

            <span class="whitespace-nowrap">濕度：{{ weather.humidity }}%</span>
            <span class="whitespace-nowrap">風速：{{ weather.wind }}</span>
          </div>
        </div>

        <div class="flex items-center gap-3 self-start md:self-auto">
          <div class="hidden md:flex items-center gap-2 mr-1">
            <i class="pi pi-calendar text-white"></i>
            <div class="flex flex-col leading-tight">
              <span class="font-bold text-sm">鄉長行程</span>
              <span class="text-white/90 text-sm">今日：{{ todayEvent }}</span>
            </div>
          </div>
        </div>
        <div class="flex gap-2 items-center justify-end">
          <Button
            label="查看完整行程"
            class="shrink-0 bg-white! text-sky-600! border-0! px-3! py-1.5! rounded-full! text-sm! font-bold shadow-sm"
          />
          <Button
            label="加LINE好友"
            class="shrink-0 bg-white! text-emerald-600! border-0! px-3! py-1.5! rounded-full! text-sm! font-bold shadow-sm"
          />
        </div>
      </div>
    </div>
  </section>

  <section>
    <HeroInfoMobile />
  </section>

  <section>
    <HeroNavMobile />
  </section>

  <section>
    <HeroServiceMobile />
  </section>

  <section>
    <HeroLinkMobile />
  </section>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import HeroInfoMobile from "./HeroInfoMobile.vue";
import HeroNavMobile from "./HeroNavMobile.vue";
import HeroServiceMobile from "./HeroServiceMobile.vue";
import HeroLinkMobile from "./HeroLinkMobile.vue";

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
function next() {
  current.value = (current.value + 1) % slides.value.length;
}
function prev() {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length;
}

const weather = ref({
  location: "鹿谷鄉",
  temp: 25,
  condition: "多雲",
  humidity: 68,
  wind: "3.2 km/h",
});

const todayEvent = ref("社區發展會議");
</script>

<style scoped>
/* 保持箭頭按鈕在移動端更小巧的點擊區 */
button[aria-label="上一張"],
button[aria-label="下一張"] {
  line-height: 0;
}
</style>
