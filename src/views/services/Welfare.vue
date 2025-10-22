<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <!-- 側欄 -->
      <ServicesSidebar class="hidden lg:block" :items="servicesMenu" />

      <!-- 主內容 -->
      <main class="flex-1 min-w-0" id="main">
        <!-- 標題列 -->
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              社會福利
            </h1>
            <Breadcrumb class="mt-2" :model="breadcrumbModel" :home="breadcrumbHome" />
          </div>

          <!-- 字級＋列印 -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-slate-500 mr-1">字級</span>
            <Button
              label="小"
              size="small"
              severity="secondary"
              :outlined="fontScale !== 'sm'"
              :raised="fontScale === 'sm'"
              @click="setFont('sm')"
            />
            <Button
              label="中"
              size="small"
              severity="secondary"
              :outlined="fontScale !== 'md'"
              :raised="fontScale === 'md'"
              @click="setFont('md')"
            />
            <Button
              label="大"
              size="small"
              severity="secondary"
              :outlined="fontScale !== 'lg'"
              :raised="fontScale === 'lg'"
              @click="setFont('lg')"
            />
            <div class="w-px h-6 bg-slate-200 mx-2" aria-hidden="true"></div>
            <Button
              icon="pi pi-print"
              label="列印"
              size="small"
              severity="help"
              @click="printPage"
            />
          </div>
        </header>

        <!-- 圖標牆 -->
        <!-- 圖標牆（等寬等高） -->
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
                <!-- 卡片本體 = 正方形 -->
                <div
                  :class="[
                    'aspect-square rounded-2xl p-6 flex flex-col items-center justify-center',
                    'bg-linear-to-br',
                    bgByIndex(i),
                  ]"
                >
                  <!-- 圖示圓點 -->
                  <div
                    class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/15 ring-1 ring-white/30 flex items-center justify-center"
                  >
                    <i
                      :class="['pi', c.icon, 'text-white text-3xl md:text-4xl']"
                      aria-hidden="true"
                    ></i>
                  </div>

                  <!-- 標題：兩行上限、固定高度，確保卡片不被撐高 -->
                  <h3
                    class="mt-4 text-white font-extrabold text-lg md:text-xl tracking-wide text-center leading-snug line-clamp-2 px-2 min-h-13"
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
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import ServicesSidebar from "@/components/services/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";

/* 側欄選單（第一張圖） */
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
  { slug: "low-income", label: "低收入戶", icon: "pi-dollar" },
  { slug: "childcare-subsidy", label: "中低托育養護補助", icon: "pi-users" },
  { slug: "nhi", label: "全民健康保險", icon: "pi-id-card" },
  { slug: "pension", label: "國民年金業務", icon: "pi-wallet" },
  { slug: "disability", label: "身心障礙證明", icon: "pi-wheelchair" },
  { slug: "legal", label: "法律諮詢", icon: "pi-balance-scale" }, // ← 建議用這個
  { slug: "elderly", label: "中低老人生活補助", icon: "pi-gavel" }, // ← 建議用這個
  { slug: "emergency-aid", label: "急難救助補助", icon: "pi-megaphone" },
  { slug: "safety-net", label: "強化社會安全網關懷救助", icon: "pi-shield" },
];

// 依索引套一組漸層（想統一顏色就把 palette 換成 ['from-emerald-600 to-emerald-700']）
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

/* 字級切換 */
const fontScale = ref(localStorage.getItem("services.font") || "md");
const fontSizeClasses = computed(() =>
  fontScale.value === "sm"
    ? { title: "text-2xl", body: "text-[0.95rem]" }
    : fontScale.value === "lg"
    ? { title: "text-4xl", body: "text-[1.1rem]" }
    : { title: "text-3xl", body: "text-base" }
);
function setFont(s) {
  fontScale.value = s;
  localStorage.setItem("services.font", s);
}
function printPage() {
  window.print();
}
</script>
