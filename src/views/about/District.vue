<!-- src/views/about/Geography.vue -->
<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <AboutSidebar class="hidden lg:block text-xl" :items="aboutMenu" />

      <main class="flex-1 min-w-0" id="main">
        <header class="flex items-end justify-between gap-4 mb-10">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              行政區域
            </h1>
            <Breadcrumb
              class="mt-2 text-xl"
              :model="breadcrumbModel"
              :home="breadcrumbHome"
            />
          </div>

          <div class="flex items-center gap-2">
            <span class="text-lg text-slate-500 mr-1">字級</span>
            <Button
              label="小"
              size="small"
              severity="secondary"
              :outlined="fontScale !== 'sm'"
              :raised="fontScale === 'sm'"
              class="text-xl"
              @click="setFont('sm')"
            />
            <Button
              label="中"
              size="small"
              severity="secondary"
              :outlined="fontScale !== 'md'"
              :raised="fontScale === 'md'"
              class="text-xl"
              @click="setFont('md')"
            />
            <Button
              label="大"
              size="small"
              severity="secondary"
              :outlined="fontScale !== 'lg'"
              :raised="fontScale === 'lg'"
              class="text-xl"
              @click="setFont('lg')"
            />
            <div class="w-px h-6 bg-slate-200 mx-2" aria-hidden="true"></div>
            <Button
              icon="pi pi-print"
              label="列印"
              size="small"
              severity="help"
              class="text-xl"
              @click="printPage"
            />
          </div>
        </header>

        <!-- 互動式影像地圖（未選擇時顯示） -->
        <section v-if="!activeRegion">
          <LuguMap
            svg-url="/Lugu_villages.svg"
            :container-width="960"
            :region-meta="meta"
            :highlight-fill="'rgba(34,197,94,0.55)'"
            :label-source="'meta'"
            @select="openDetail"
          />
        </section>

        <!-- 已選村：顯示介紹 -->
        <section v-else>
          <DistrictDetail :region="activeRegion" @close="activeRegion = null" />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AboutSidebar from "@/components/about/Sidebar.vue";
import LuguMap from "@/components/about/LuguMap.vue";
import DistrictDetail from "./DistrictDetail.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";

const activeRegion = ref(null);

// 點擊「前往介紹」後接收 LuguMap 傳來的 region（內含 label/desc/link/img）
function openDetail(region) {
  activeRegion.value = region || null;
}

const aboutMenu = [
  { label: "鹿谷簡介", to: { name: "about-overview" } },
  { label: "公所介紹", to: { name: "about-history" } },
  { label: "觀光景點", to: { name: "about-geography" } },
  { label: "特產介紹", to: { name: "about-specialty" } },
  { label: "交通運輸", to: { name: "about-traffic" } },
  { label: "行政區域", to: { name: "about-districts" } },
  { label: "各課室業務", to: { name: "about-departments" } },
  { label: "課室分機", to: { name: "services" } },
  { label: "鄉志", to: { name: "about-chronicle" } },
];

const meta = [
  {
    id: "1",
    label: "彰雅村",
    desc:
      "鹿谷茶區核心聚落之一，早年以凍頂烏龍茶馳名，茶園與梯田交織，農旅共榮；四季分明，適合慢遊茶徑與品茗。",
    link:
      "https://zh.wikipedia.org/zh-hant/%E5%87%8D%E9%A0%82%E7%83%8F%E9%BE%8D%E8%8C%B6",
    img: "https://cdn-smiletaiwan.cw.com.tw/article/201807/article-5b59f3ffecbd2.jpg",
  },
  {
    id: "2",
    label: "廣興村",
    desc:
      "位於鹿谷中西側丘陵帶，茶園與竹林並行，聚落沿溪分布，農林產豐富；適合單車與鄉間步行，保留純樸風情。",
    link: "https://zh.wikipedia.org/zh-hant/%E9%B9%BF%E8%B0%B7%E9%84%89",
    img: "",
  },
  {
    id: "3",
    label: "鹿谷村",
    desc:
      "鄉治中心所在，商家密集、服務完整，清代新寮開墾發展而成，茶產業興盛，傳統市街與現代機能並存，生活便利。",
    link: "https://zh.wikipedia.org/zh-tw/%E9%B9%BF%E8%B0%B7%E6%9D%91",
    img: "",
  },
  {
    id: "4",
    label: "初鄉村",
    desc:
      "為鹿谷早期開墾據點之一，聚落沿山麓展開，田園景致靜謐，保存傳統風貌與人情味，適合深度走讀漫遊體驗。",
    link: "https://zh.wikipedia.org/zh-hant/%E5%88%9D%E9%84%89",
    img: "",
  },
  {
    id: "5",
    label: "鳳凰村",
    desc:
      "鳳凰谷鳥園與生態步道所在，丘陵茶園連綿，生物多樣性高，四時景色豐富，兼具教育解說與休閒觀光，親子友善。",
    link:
      "https://zh.wikipedia.org/zh-tw/%E5%9C%8B%E7%AB%8B%E8%87%AA%E7%84%B6%E7%A7%91%E5%AD%B8%E5%8D%9A%E7%89%A9%E9%A4%A8%E9%B3%B3%E5%87%B0%E8%B0%B7%E9%B3%A5%E5%9C%92%E7%94%9F%E6%85%8B%E5%9C%92%E5%8D%80",
    img: "",
  },
  {
    id: "6",
    label: "永隆村",
    desc:
      "位於麒麟潭與凍頂山麓台地，茶園與農田交錯，空氣清新視野開闊；聚落發展穩定，兼具在地文化與旅遊，宜居。",
    link:
      "https://zh.wikipedia.org/zh-hant/%E6%B0%B8%E9%9A%86%E6%9D%91_%28%E5%8D%97%E6%8A%95%E7%B8%A3%29",
    img: "",
  },
  {
    id: "7",
    label: "秀峰村",
    desc:
      "俗稱坪仔頂，地勢起伏成小台地，竹林與茶園廣布，景觀清幽；社區凝聚力強，常見在地活動與祭典，人情溫厚。",
    link:
      "https://zh.wikipedia.org/zh-hant/%E7%A7%80%E5%B3%B0%E6%9D%91_%28%E5%8D%97%E6%8A%95%E7%B8%A3%29",
    img: "",
  },
  {
    id: "8",
    label: "清水村",
    desc:
      "座落濁水溪支流平原與丘陵交界，農田條理分明，水源豐沛；聚落巷弄留存舊時風貌，生活步調寧靜，適合漫遊。",
    link: "https://zh.wikipedia.org/zh-hant/%E6%B8%85%E6%B0%B4%E6%9D%91",
    img: "",
  },
  {
    id: "9",
    label: "瑞田村",
    desc:
      "位於鹿谷北端，地形由沖積平原過渡至丘陵，農作多元，林竹與茶園並見；社區純樸友善，保有鄉間風貌與步調。",
    link: "https://zh.wikipedia.org/zh-hant/%E9%B9%BF%E8%B0%B7%E9%84%89",
    img: "",
  },
  {
    id: "10",
    label: "竹豐村",
    desc:
      "位在小半天風景帶，茶園梯田與竹林相依，觀光步道環繞；四季雲霧繚繞，適合品茗散步與沉浸山林，假日良伴。",
    link: "https://zh.wikipedia.org/zh-cn/%E5%B0%8F%E5%8D%8A%E5%A4%A9",
    img: "",
  },
  {
    id: "11",
    label: "竹林村",
    desc:
      "小半天核心聚落之一，竹海起伏層層，茶產與林業並行，設有觀景與步道節點，氛圍恬靜，親近自然與在地文化。",
    link: "https://zh.wikipedia.org/zh-cn/%E5%B0%8F%E5%8D%8A%E5%A4%A9",
    img: "",
  },
  {
    id: "12",
    label: "和雅村",
    desc:
      "位處內樹皮高地範圍，昔以孟宗竹培育聞名，視野遼闊、雲霧繚繞；聚落散布山坡線，保有樸實農風，人文相融。",
    link: "https://zh.wikipedia.org/zh-tw/%E5%85%A7%E6%A8%B9%E7%9A%AE",
    img: "",
  },
  {
    id: "13",
    label: "內湖村",
    desc:
      "溪頭自然教育園區與妖怪村門戶，林相茂密氣候涼爽，步道完善；知名景點多，旅遊機能成熟，適合森林療癒。",
    link: "https://zh.wikipedia.org/zh-tw/%E6%BA%AA%E9%A0%AD",
    img: "",
  },
];

const breadcrumbHome = { icon: "pi pi-home", to: { name: "home" } };
const breadcrumbModel = [
  { label: "關於鹿谷", to: { name: "about" } },
  { label: "行政區域" },
];

const fontScale = ref(localStorage.getItem("about.font") || "md");
const fontSizeClasses = computed(() => {
  switch (fontScale.value) {
    case "sm":
      return { title: "text-4xl", body: "text-lg" };
    case "lg":
      return { title: "text-6xl", body: "text-2xl" };
    default:
      return { title: "text-5xl", body: "text-xl" };
  }
});
function setFont(s) {
  fontScale.value = s;
  localStorage.setItem("about.font", s);
}
function printPage() {
  window.print();
}
</script>

<style scoped>
@media print {
  :host,
  .max-w-7xl {
    max-width: 100% !important;
    padding: 0 !important;
  }
  aside,
  .p-breadcrumb .p-breadcrumb-chevron,
  .p-button {
    display: none !important;
  }
  main {
    width: 100% !important;
  }
  h1 {
    margin-bottom: 8px;
  }
}
</style>
