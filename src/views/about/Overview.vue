<!-- src/views/about/Overview.vue -->
<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <AboutSidebar class="hidden lg:block text-xl" :items="aboutMenu" />

      <main class="flex-1 min-w-0" id="main">
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              鹿谷簡介
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

        <article
          :class="[
            'mt-4 rounded-lg border border-slate-200 bg-white p-4 md:p-6 leading-relaxed',
            fontSizeClasses.body,
          ]"
          aria-label="鹿谷簡介文章"
        >
          <div class="flex flex-wrap gap-2 mb-4" aria-label="文章標籤">
            <button
              class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              歷史沿革
            </button>
            <button
              class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              自然環境
            </button>
            <button
              class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              人口統計
            </button>
          </div>

          <p class="text-slate-800">
            鹿谷鄉位於南投縣，所生產的茶葉與竹筍聞名全台，境內之溪頭森林遊樂區與實驗林，在台灣大學多年之經營與維護下，擁有豐富的森林生態研究資源，可提供作為自然生態系統運作的展示教室。鹿谷鄉的開發可大致區分為三個階段，即清治、日據與台灣光復三個時期：
          </p>

          <h2 class="mt-6 mb-2 text-3xl font-bold text-emerald-900">一、清治時期</h2>
          <p>
            鹿谷開拓始於清朝約當 1741
            年左右，最初以竹山為南投、台中地區的政治經濟中心，當時稱為林圮埔（係紀念鄭成功參軍林兒率部隊進入竹山、鹿谷一帶屯墾），即包括今日鹿谷地區，而歷經屯墾，包括初鄉、新寮、坪仔頂、車輄寮、小半天、內樹皮地區陸續開拓，並於道光
            11
            年間，初鄉林鳳池舉人，從福建武夷山帶回軟枝烏龍茶栽種，位於凍頂上成為今日全鄉最重要之經濟作物凍頂烏龍茶。
          </p>

          <h2 class="mt-6 mb-2 text-3xl font-bold text-emerald-900">二、日據時期</h2>
          <p>
            民國前八年，日本殖民政府設置沙連堡羌仔寮區役場於鹿谷村新寮，民國元年將區役場移設鹿谷村現址，民國九年改制，將沙連堡羌仔寮區改為鹿谷庄，乃取本鄉山岳綿延、溪谷甚多而名之，此時，鹿谷發展已初具規模。
          </p>

          <h2 class="mt-6 mb-2 text-3xl font-bold text-emerald-900">三、台灣光復後</h2>
          <p>
            民國 34 年台灣光復，國民政府廢州郡改縣市，當時隸屬台中縣竹山區，民國 39
            年廢區改為南投縣鹿谷鄉，從此鹿谷行政區確立，並沿用至今，民國 44
            年行政區域調整共計 13 村。
          </p>

          <h2 class="mt-6 mb-2 text-3xl font-bold text-emerald-900">四、中華民國時期</h2>
          <p>
            民國 34 年台灣光復，國民政府廢州郡改縣市，當時隸屬台中縣竹山區，民國 39
            年廢區改為南投縣鹿谷鄉，從此鹿谷行政區確立，並沿用至今，民國 44
            年行政區域調整共計 13 村。
          </p>

          <p class="mt-6 text-slate-700">本鄉歷史發展重要事記</p>

          <div
            class="mt-3 overflow-x-auto rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-600"
            tabindex="0"
          >
            <table
              class="w-full text-left border-collapse"
              aria-label="鹿谷鄉歷史發展重要事記"
            >
              <caption class="sr-only">
                鹿谷鄉歷史發展重要事記
              </caption>

              <thead>
                <tr class="bg-emerald-700 text-white">
                  <th scope="col" class="px-3 py-2 w-32">時間</th>
                  <th scope="col" class="px-3 py-2">內容</th>
                </tr>
              </thead>

              <tbody class="text-slate-800">
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1741</th>
                  <td class="px-3 py-2">
                    濁水入志成，沿湳水溪進入番仔寮及大坪園（瑞田村清水村）開闢。
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1787</th>
                  <td class="px-3 py-2">
                    泉州人許幕生自林杞埔（竹山）東進，在鹿谷境內築寮種莿麻，稱「先仔寮」；另一說為因民眾以「莿蔴」為生、有工作寮，因而衍生名「先仔寮」。
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1800</th>
                  <td class="px-3 py-2">
                    大坪頂西側與黃二氏合開大水溝，引水灌溉，周邊農田拓墾，農業漸興。
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">道光11年</th>
                  <td class="px-3 py-2">
                    初鄉林鳳池舉人自福建武夷山帶回軟枝烏龍，廣植凍頂各地，成為今日重要經濟作物「凍頂烏龍茶」。
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1903</th>
                  <td class="px-3 py-2">日本設置沙連堡羌仔寮區役場於鹿谷新寮。</td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1903</th>
                  <td class="px-3 py-2">明治29年鹿谷隸屬嘉義農林書記捕務署沙連堡。</td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1903</th>
                  <td class="px-3 py-2">明治31年鹿谷改隸屬台中縣斗六辨務署沙連堡。</td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1903</th>
                  <td class="px-3 py-2">明治34年鹿谷改隸南投廳林杞埔支廳沙連堡。</td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1912</th>
                  <td class="px-3 py-2">
                    民國元年，林杞埔改稱竹山；羌仔寮（鹿谷）隸屬台中州竹山郡鹿谷庄，「先仔寮」之名確立為「鹿谷」。
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1920–1945</th>
                  <td class="px-3 py-2">
                    鹿谷各聚落陸續開拓：初鄉、坪仔頂（秀峰）、車輄寮（廣興）、小半天（竹林）、內樹皮（和雅）等，並有「大坪頂七處」之稱。
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1945</th>
                  <td class="px-3 py-2">台灣光復，鹿谷庄改制為鹿谷鄉。</td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1946</th>
                  <td class="px-3 py-2">
                    2 月 25
                    日設立鄉公所，管轄初鄉、鹿谷、彰雅、廣興、內湖、竹林、竹豐、永興等八村。
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1950</th>
                  <td class="px-3 py-2">行政區域調整，永豐及永興二村改隸水里鄉。</td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1970</th>
                  <td class="px-3 py-2">設立溪頭森林遊樂區，觀光發展起步。</td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1978</th>
                  <td class="px-3 py-2">
                    行政區確定共計十三村：初鄉、鹿谷、彰雅、廣興、內湖、竹林、竹豐、和雅、鳳凰、永隆、秀峰、清水、瑞田。
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1982</th>
                  <td class="px-3 py-2">設立鳳凰谷鳥園。</td>
                </tr>
                <tr class="odd:bg-white even:bg-slate-50">
                  <th scope="row" class="px-3 py-2 font-semibold">1999</th>
                  <td class="px-3 py-2">
                    9 月 21 日發生 921 集集大地震（規模 7.3），本鄉受創嚴重。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<script setup>
/*
  文字等級整體 +2（Tailwind 標準階梯）：
  - text-sm  → text-lg
  - text-base → text-xl
  - text-lg  → text-2xl
  - text-xl  → text-3xl
  - text-2xl → text-4xl
  - text-3xl → text-5xl
  並調整：
  - Breadcrumb / Sidebar / 控制按鈕（Button）以 class 加大
  - 自訂字級（fontScale）整體上移 2 級：sm→text-4xl/ text-lg、md→text-5xl/ text-xl、lg→text-6xl/ text-2xl
*/

import { ref, computed } from "vue";
import AboutSidebar from "@/components/about/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";

const aboutMenu = [
  { label: "鹿谷簡介", to: { name: "about-overview" } },
  { label: "公所介紹", to: { name: "about-history" } },
  { label: "觀光景點", to: { name: "about-geography" } },
  { label: "特產介紹", to: { name: "about-specialty" } },
  { label: "交通運輸", to: { name: "about-traffic" } },
  { label: "行政區域", to: { name: "about-districts" } },
  { label: "各課室業務", to: { name: "about-departments" } },
  { label: "課室分機", to: { name: "services" } },
  { label: "行政區域圖", to: { name: "about-district-map" } },
  { label: "鄉志", to: { name: "about-chronicle" } },
];

const breadcrumbHome = { icon: "pi pi-home", to: { name: "home" } };
const breadcrumbModel = [
  { label: "關於鹿谷", to: { name: "about" } },
  { label: "鹿谷簡介" },
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
