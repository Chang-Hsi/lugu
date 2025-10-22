<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <ServicesSidebar class="hidden lg:block text-xl" :items="servicesMenu" />

      <main class="flex-1 min-w-0" id="main">
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1 class="font-extrabold text-slate-800 text-5xl md:text-6xl truncate">
              {{ title }}
            </h1>
            <Breadcrumb class="mt-2 text-xl" :model="bcModel" :home="bcHome" />
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

        <section
          class="mt-5 rounded-lg border border-slate-200 bg-white p-6 md:p-8 leading-relaxed text-xl"
        >
          <h2 class="text-3xl font-bold mb-4">申請資格：</h2>
          <ol class="list-decimal pl-6 space-y-2">
            <li>早年離異或遠離家庭，對於子女或子女未盡扶養義務。</li>
            <li>
              符合家庭總收入平均分配全家人口每人每月在最低生活費以下，且家庭財產（包含動產及不動產）
              未超過中央主管機關公告之當年度一定金額者。
            </li>
            <li>設籍並實際居住於本縣，且最近一年居住國內超過一百八十三日。</li>
          </ol>

          <h2 class="text-3xl font-bold mt-8 mb-4">
            全家人口，其應計算人口範圍包括下列人員：
          </h2>
          <ol class="list-decimal pl-6 space-y-2">
            <li>配偶。</li>
            <li>一親等之直系血親。</li>
            <li>同一戶籍或共同生活之其他直系血親。</li>
            <li>前三款以外，認列綜合所得稅扶養親屬免稅額納稅義務人。</li>
          </ol>

          <h2 class="text-3xl font-bold mt-8 mb-4">申請資料：</h2>
          <ol class="list-decimal pl-6 space-y-2">
            <li>戶籍謄本或戶口名簿（應提示全家人口範圍）。</li>
            <li>切結書。</li>
            <li>存摺影印本（禁止戶應出示相關證明文件）。</li>
            <li>在學、在監、服役、重大傷病、身障手冊、月退休金存摺內頁影本。</li>
          </ol>

          <h2 class="text-3xl font-bold mt-8 mb-4">審核標準：</h2>
          <ol class="list-decimal pl-6 space-y-2">
            <li>
              家庭總收入按全家人口平均分配，每人每月未超過最低生活費（108
              年起最低生活費為新台幣 12,388 元）。
            </li>
            <li>
              全家人口之現金（含存款本金及利息）、有價證券及投資平均每人每年未超過新台幣
              75,000 元。
            </li>
            <li>全家人口之土地公告現值及房屋評定標準合計金額未超過新台幣 350 萬元。</li>
          </ol>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
/*
  調整說明：
  1) 以你提供的正式文字取代原本示意段落。
  2) 所有可見文字 +2 階：
     - 標題 h1：text-3xl/md:text-4xl → text-5xl/md:text-6xl
     - Breadcrumb、按鈕等：加上 text-xl
     - 內文容器：text-base → text-xl；小標：text-xl → text-3xl
*/

import { computed } from "vue";
import { useRoute } from "vue-router";
import ServicesSidebar from "@/components/services/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";

const servicesMenu = [
  { label: "社會福利", name: "services-welfare" },
  { label: "防災專區", name: "services-disaster" },
  { label: "兵役資訊", name: "services-military" },
  { label: "鄉立幼兒園", name: "services-kindergarten" },
  { label: "鹿谷鄉路思堂", name: "services-grace-hall" },
  { label: "相關連結", name: "services-links" },
  { label: "常見問題", name: "services-faq" },
  { label: "鹿谷鄉立圖書館", name: "services-library" },
  { label: "公職人員利益衝突迴避法身分關係公開專區", name: "services-conflict" },
  { label: "抗旱專區", name: "services-drought" },
];

const map = {
  "low-income": "低收入戶",
  "childcare-subsidy": "中低托育養護補助",
  nhi: "全民健康保險",
  pension: "國民年金業務",
  disability: "身心障礙證明",
  legal: "法律諮詢",
  elderly: "中低老人生活補助",
  "emergency-aid": "急難救助補助",
  "safety-net": "強化社會安全網關懷救助",
};

const route = useRoute();
const title = computed(() => map[route.params.slug] || "社會福利");

const bcHome = { icon: "pi pi-home", to: { name: "home" } };
const bcModel = computed(() => [
  { label: "便民服務", to: { name: "services" } },
  { label: "社會福利", to: { name: "services-welfare" } },
  { label: title.value },
]);
</script>
