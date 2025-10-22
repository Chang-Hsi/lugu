<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <!-- 側欄 -->
      <OnlineSidebar class="hidden lg:block text-xl" :items="onlineMenu" />

      <!-- 主內容 -->
      <main class="flex-1 min-w-0" id="main">
        <!-- 標題列 -->
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              線上服務交流
            </h1>
            <Breadcrumb
              class="mt-2 text-xl"
              :model="breadcrumbModel"
              :home="breadcrumbHome"
            />
          </div>

          <!-- 字級＋列印 -->
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

        <!-- 九宮格 -->
        <section class="mt-5">
          <ul
            class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
            role="list"
            aria-label="線上服務交流選單"
          >
            <li v-for="(c, i) in cards" :key="c.to.name" role="listitem">
              <RouterLink
                :to="c.to"
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
                  <!-- 圖示圓點 -->
                  <div
                    class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/15 ring-1 ring-white/30 flex items-center justify-center"
                  >
                    <!-- 僅放大 icon（PrimeIcons 以 CSS 變數控制） -->
                    <i
                      :class="['pi', c.icon]"
                      class="text-white [--p-icon-size:2.25rem] md:[--p-icon-size:3rem]"
                      aria-hidden="true"
                    />
                  </div>

                  <!-- 標題 -->
                  <h3
                    class="mt-4 text-white font-extrabold text-2xl md:text-3xl tracking-wide text-center leading-snug line-clamp-2 px-2 min-h-13"
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
import OnlineSidebar from "@/components/online/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";

/* 側欄（依右圖目錄） */
const onlineMenu = [
  { label: "問卷調查", name: "online-surveys" },
  { label: "線上投票", name: "online-votes" },
  { label: "表單下載", name: "online-forms" },
  { label: "活動報名", name: "online-signup" },
  { label: "路燈報修", name: "online-streetlight" },
  { label: "道路報修", name: "online-road" },
  { label: "反射鏡報修", name: "online-mirror" },
  { label: "災害通報", name: "online-disaster" },
  { label: "災害通報查詢", name: "online-disaster-query" },
];

/* 九宮格卡片（用 PrimeIcons 現有圖示） */
const cards = [
  { label: "問卷調查", icon: "pi-question-circle", to: { name: "online-surveys" } },
  { label: "線上投票", icon: "pi-check-square", to: { name: "online-votes" } },
  { label: "表單下載", icon: "pi-download", to: { name: "online-forms" } },
  { label: "活動報名", icon: "pi-calendar", to: { name: "online-signup" } },
  { label: "路燈報修", icon: "pi-lightbulb", to: { name: "online-streetlight" } },
  { label: "道路報修", icon: "pi-directions", to: { name: "online-road" } },
  { label: "反射鏡報修", icon: "pi-minus-circle", to: { name: "online-mirror" } },
  { label: "災害通報", icon: "pi-truck", to: { name: "online-disaster" } },
  { label: "災害通報查詢", icon: "pi-search", to: { name: "online-disaster-query" } },
];

/* 漸層色盤 */
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
const breadcrumbModel = [{ label: "線上服務交流", to: { name: "online" } }];

/* 字級（整體 +2） */
const fontScale = ref(localStorage.getItem("online.font") || "md");
const fontSizeClasses = computed(() =>
  fontScale.value === "sm"
    ? { title: "text-4xl", body: "text-lg" }
    : fontScale.value === "lg"
    ? { title: "text-6xl", body: "text-2xl" }
    : { title: "text-5xl", body: "text-xl" }
);
function setFont(s) {
  fontScale.value = s;
  localStorage.setItem("online.font", s);
}
function printPage() {
  window.print();
}
</script>
