<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <!-- 側欄 -->
      <ServicesSidebar class="hidden lg:block" :items="servicesMenu" />

      <!-- 主內容 -->
      <main class="flex-1 min-w-0" id="main">
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1 class="font-extrabold text-slate-800 text-3xl md:text-4xl truncate">
              {{ title }}
            </h1>
            <Breadcrumb class="mt-2" :model="bcModel" :home="bcHome" />
          </div>
          <Button
            icon="pi pi-print"
            label="列印"
            size="small"
            severity="help"
            @click="window.print()"
          />
        </header>

        <section class="mt-5 rounded-lg border border-slate-200 bg-white p-4 leading-8">
          <!-- 這裡先放示意；你可替換為實際內容 -->
          <h2 class="text-xl font-bold mb-3">{{ title }}</h2>
          <p class="text-slate-700">
            申請資格、應備文件、承辦單位與流程等內容，之後可由後端帶資料或改為 CMS 管理。
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
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

// slug → 顯示文字
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

// 麵包屑
const bcHome = { icon: "pi pi-home", to: { name: "home" } };
const bcModel = computed(() => [
  { label: "便民服務", to: { name: "services" } },
  { label: "社會福利", to: { name: "services-welfare" } },
  { label: title.value },
]);
</script>
