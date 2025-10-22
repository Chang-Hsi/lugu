<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <ServicesSidebar class="hidden lg:block text-xl" :items="servicesMenu" />

      <main class="flex-1 min-w-0" id="main">
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              社會福利
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

        <section class="mt-5">
          <ul
            class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
            role="list"
            aria-label="社會福利項目"
          >
            <li v-for="(c, i) in cards" :key="c.slug" role="listitem">
              <RouterLink
                :to="{ name: 'services-welfare-detail', params: { slug: c.slug } }"
                :aria-label="c.label"
                class="group block rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
              >
                <div
                  :class="[
                    'aspect-square rounded-2xl p-6 flex flex-col items-center justify-center',
                    'bg-linear-to-br',
                    bgByIndex(i),
                  ]"
                >
                  <div
                    class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/15 ring-1 ring-white/30 flex items-center justify-center"
                  >
                    <!-- 調整：僅放大 icon 字級 -->
                    <i
                      :class="['pi', c.icon]"
                      class="text-white [--p-icon-size:2rem] md:[--p-icon-size:2.75rem]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    class="mt-4 text-white font-extrabold text-xl md:text-2xl tracking-wide text-center leading-snug line-clamp-2 px-2 min-h-13"
                  >
                    {{ c.label }}
                  </h3>
                </div>
              </RouterLink>
            </li>
          </ul>
        </section>
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
  已同步放大：
  - Sidebar / Breadcrumb / 字級控制區的文字
  - 卡片標題 h3：text-lg md:text-xl → text-2xl md:text-3xl
  - 字級切換邏輯（fontScale）上移 2 級：sm→4xl/lg、md→5xl/xl、lg→6xl/2xl
*/

import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import ServicesSidebar from "@/components/services/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";

/* 側欄選單 */
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

/* Welfare 九宮格 */
const cards = [
  // 既有
  { slug: "low-income", label: "低收入戶", icon: "pi-dollar" },
  { slug: "childcare-subsidy", label: "中低托育養護補助", icon: "pi-users" },
  { slug: "nhi", label: "全民健康保險", icon: "pi-id-card" },
  { slug: "pension", label: "國民年金業務", icon: "pi-wallet" },
  { slug: "disability", label: "身心障礙證明", icon: "pi-thumbs-up" },
  { slug: "legal", label: "法律諮詢", icon: "pi-file" },
  { slug: "elderly", label: "中低老人生活補助", icon: "pi-building" },
  { slug: "emergency-aid", label: "急難救助補助", icon: "pi-exclamation-triangle" }, // 警示最貼近
  { slug: "safety-net", label: "強化社會安全網關懷救助", icon: "pi-shield" },

  // 依圖片新增（第2列）
  { slug: "special-hardship-family", label: "特殊境遇家庭生活補助", icon: "pi-users" },
  { slug: "community-mortuaries", label: "國民喪葬", icon: "pi-briefcase" }, // 若要更精確可改label；圖示取務務性
  { slug: "community-development", label: "社區發展業務", icon: "pi-building" },

  // 第3列
  { slug: "food-bank", label: "食物銀行", icon: "pi-shopping-cart" },
  { slug: "low-income-cert", label: "中低收入戶證明", icon: "pi-id-card" },
  { slug: "low-income-living", label: "中低收入戶生活補助", icon: "pi-heart" },

  // 第4列
  { slug: "child-living", label: "兒少生活補助", icon: "pi-user" },
  {
    slug: "elderly-disabled-iccard",
    label: "老人暨身心障礙乘車IC卡",
    icon: "pi-id-card",
  },
  { slug: "form-download", label: "補助申請表下載", icon: "pi-file-pdf" },

  // 第5列
  {
    slug: "921-damage-proof",
    label: "九二一天然災害住宅受損證明申請書",
    icon: "pi-home",
  },
  {
    slug: "home-safety-check",
    label: "脆弱族群居家防災檢視",
    icon: "pi-exclamation-circle",
  },
  { slug: "elderly-care-allowance", label: "高齡者關懷及照護", icon: "pi-thumbs-up" },

  // 第6列（身障與規範）
  { slug: "crpd", label: "身心障礙者權利公約（CRPD）", icon: "pi-book" },
  { slug: "disability-parking", label: "身障專用停車位申請", icon: "pi-clipboard" },
  { slug: "local-regs", label: "南投鹿谷各類補助辦法", icon: "pi-file" },
];

const palette = [
  "from-emerald-600 to-teal-700",
  "from-sky-600 to-blue-700",
  "from-rose-600 to-pink-700",
  "from-violet-600 to-purple-700",
  "from-amber-600 to-orange-700",
  "from-cyan-600 to-blue-700",
  "from-lime-600 to-emerald-700",
  "from-indigo-600 to-slate-700",
  "from-teal-600 to-emerald-700",
];
const bgByIndex = (i) => palette[i % palette.length];

/* 麵包屑 */
const breadcrumbHome = { icon: "pi pi-home", to: { name: "home" } };
const breadcrumbModel = [
  { label: "便民服務", to: { name: "services" } },
  { label: "社會福利" },
];

/* 字級切換（+2 階） */
const fontScale = ref(localStorage.getItem("services.font") || "md");
const fontSizeClasses = computed(() =>
  fontScale.value === "sm"
    ? { title: "text-4xl", body: "text-lg" }
    : fontScale.value === "lg"
    ? { title: "text-6xl", body: "text-2xl" }
    : { title: "text-5xl", body: "text-xl" }
);
function setFont(s) {
  fontScale.value = s;
  localStorage.setItem("services.font", s);
}
function printPage() {
  window.print();
}
</script>
