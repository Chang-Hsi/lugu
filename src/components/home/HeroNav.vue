<!-- src/components/home/HeroNav.vue -->
<template>
  <section class="w-full">
    <div class="mx-auto max-w-7xl px-4">
      <header class="flex flex-col items-center text-center py-10">
        <h1 class="text-3xl md:text-[34px] font-extrabold text-slate-900">網站導覽</h1>
        <p class="mt-2 max-w-3xl text-slate-600">
          完整的網站資訊架構，幫助您快速找到所需的政府服務與資訊
        </p>
      </header>

      <div class="flex flex-wrap gap-6">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="flex-1 basis-full md:basis-[48%] lg:basis-[32%]"
        >
          <div class="h-full rounded-2xl border border-slate-200 bg-white">
            <div class="px-6 pt-6">
              <h2 class="text-xl font-extrabold text-slate-900">{{ cat.title }}</h2>
              <div class="mt-3 h-[2px] w-full bg-emerald-500"></div>
            </div>

            <ul class="px-6 py-4">
              <li
                v-for="item in cat.items"
                :key="item"
                class="flex items-center gap-2 py-2 text-slate-800 hover:text-emerald-700"
              >
                <svg
                  class="h-4 w-4 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707A1 1 0 018.707 5.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-[15px]">{{ item }}</span>
              </li>
            </ul>

            <div class="px-6 pb-6">
              <span
                class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[12px] text-slate-600"
              >
                共 {{ cat.items.length }} 項服務
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="my-10">
        <div
          class="mx-auto max-w-5xl rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center"
        >
          <h3 class="text-xl font-extrabold text-slate-900">需要協助？</h3>
          <p class="mt-2 text-slate-700">
            如果您無法找到所需資訊，歡迎透過以下方式聯絡我們
          </p>
          <div
            class="mt-4 flex flex-wrap items-center justify-center gap-6 text-slate-700"
          >
            <div class="flex items-center gap-2">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.49a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"
                />
              </svg>
              <span>服務專線：049-2752001</span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M20 4H4a2 2 0 00-2 2v.4l10 6.25L22 6.4V6a2 2 0 00-2-2zm0 4.25l-8 5-8-5V18a2 2 0 002 2h12a2 2 0 002-2V8.25z"
                />
              </svg>
              <span>電子信箱：lugu@nantou.gov.tw</span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M12 8a1 1 0 011 1v3.382l2.447 1.224a1 1 0 11-.894 1.788l-3-1.5A1 1 0 0111 13V9a1 1 0 011-1z"
                />
                <path
                  fill-rule="evenodd"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>服務時間：週一至週五 08:00-17:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 分類與清單資料
const categories = [
  {
    id: 1,
    title: "熱門消息",
    items: ["最新消息", "新聞稿", "招標公告", "徵才公告", "活動訊息"],
  },
  {
    id: 2,
    title: "關於鹿谷",
    items: [
      "鹿谷簡介",
      "公所介紹",
      "觀光景點",
      "特產介紹",
      "交通運輸",
      "行政區",
      "各課室業務",
      "課室分機",
      "行政區域圖",
      "鄉志",
    ],
  },
  {
    id: 3,
    title: "法規政策",
    items: [
      "政策相關",
      "年度經費",
      "資訊公開",
      "廉政園地",
      "施工工程",
      "最新債務訊息",
      "災後復建會議",
      "永續提升人行安全計畫",
      "綠能廉潔行政透明專區",
    ],
  },
  {
    id: 4,
    title: "便民服務",
    items: [
      "社會福利",
      "防災專區",
      "兵役資訊",
      "鄉立幼兒園",
      "鹿谷鄉銘恩堂",
      "防救災資訊及災害應變中心",
      "相關連結",
      "常見問題",
      "鹿谷鄉立圖書館",
      "公職人員利益衝突迴避法身分關係公開專區",
      "抗旱專區",
    ],
  },
  {
    id: 5,
    title: "代表會",
    items: ["鄉民代表會", "出國考察報告", "代表會活動", "會議資訊"],
  },
  {
    id: 6,
    title: "線上服務交流",
    items: [
      "問卷調查",
      "線上投票",
      "表單下載",
      "活動報名",
      "路燈報修",
      "道路報修",
      "反射鏡報修",
      "失物通報",
      "災害通報查詢",
    ],
  },
];
</script>

<style scoped></style>
