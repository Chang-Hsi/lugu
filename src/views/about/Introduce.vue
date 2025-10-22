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
              鄉長行程
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

        <nav class="mt-4 flex flex-wrap gap-2" aria-label="子分類快速篩選">
          <Button
            v-for="sub in subTypes"
            :key="sub.label"
            size="large"
            :label="sub.label"
            :pt="{
              root: {
                class:
                  '!bg-emerald-700 hover:!bg-emerald-800 !text-white !border-emerald-700 rounded-xl text-xl',
              },
            }"
            @click="goSub(sub.to)"
          />
        </nav>

        <section class="mt-5 rounded-lg border border-slate-200 bg-white p-3 md:p-4">
          <!-- 自訂工具列：上/下個月、月份標題、下載 -->
          <div class="mb-3 flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <Button label="上個月" size="small" @click="calPrev" :pt="deepGreenBtnPT" />
              <div
                class="px-3 py-1.5 rounded border bg-slate-50 text-slate-700 font-semibold"
              >
                {{ monthTitle }}
              </div>
              <Button label="下個月" size="small" @click="calNext" :pt="deepGreenBtnPT" />
            </div>
            <Button
              icon="pi pi-download"
              label="鄉長行程下載"
              size="small"
              @click="downloadICS"
              :pt="deepGreenBtnPT"
            />
          </div>

          <!-- FullCalendar -->
          <FullCalendar ref="calRef" :options="calOptions" />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
/*
  文字等級整體 +2（Tailwind 標準階梯）：
  - text-sm→text-lg / text-base→text-xl / text-lg→text-2xl / text-xl→text-3xl / ...
*/
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import AboutSidebar from "@/components/about/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";

/* FullCalendar */
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import iCalendarPlugin from "@fullcalendar/icalendar";
import zhTw from "@fullcalendar/core/locales/zh-tw";

const router = useRouter();

/* 側欄/麵包屑資料 */
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
  { label: "公所介紹" },
];

/* 右側快速篩選（目前只是導頁） */
const subTypes = [
  { label: "鄉長介紹", to: { name: "council-chair" } },
  { label: "組織架構", to: { name: "council-organization" } },
  { label: "為民服務項目", to: { name: "council-organization" } },
  { label: "公所位置", to: { name: "council-organization" } },
  { label: "國民外交", to: { name: "council-organization" } },
  { label: "鄉長行程", to: { name: "council-organization" } },
];
function goSub(to) {
  if (to) router.push(to);
}

/* 字級 */
const fontScale = ref(localStorage.getItem("about.font") || "md");
const fontSizeClasses = computed(() => {
  if (fontScale.value === "sm") return { title: "text-4xl", body: "text-lg" };
  if (fontScale.value === "lg") return { title: "text-6xl", body: "text-2xl" };
  return { title: "text-5xl", body: "text-xl" };
});
function setFont(s) {
  fontScale.value = s;
  localStorage.setItem("about.font", s);
}
function printPage() {
  window.print();
}

/* 環境變數：公開 iCal 來源（可先留空走假資料） */
const ICS_URL = import.meta.env.VITE_MAYOR_ICS_URL || "";

/* 顏色分類 */
function categoryOf(ev) {
  const t = (ev.extendedProps && ev.extendedProps.category) || ev.title || "";
  if (t.includes("告別式")) return "funeral";
  if (t.includes("祝賀")) return "celebration";
  if (t.includes("邀請")) return "invite";
  return "meeting";
}
function dotClass(ev) {
  const c = categoryOf(ev);
  if (c === "funeral") return "bg-slate-400";
  if (c === "celebration") return "bg-amber-500";
  if (c === "invite") return "bg-sky-600";
  return "bg-sky-600";
}

/* 事件渲染：小圓點＋文字 */
function renderEventContent(arg) {
  const wrap = document.createElement("div");
  wrap.className = "flex items-center gap-1 leading-tight text-sm";
  const dot = document.createElement("span");
  dot.className = "inline-block w-2 h-2 rounded-full " + dotClass(arg.event);
  const text = document.createElement("span");
  text.textContent = arg.event.title;
  wrap.append(dot, text);
  return { domNodes: [wrap] };
}

/* 沒有 ICS 時的假資料 */
const mockEvents = [
  { title: "會議", start: "2025-10-01" },
  { title: "邀請", start: "2025-10-01" },
  { title: "會議", start: "2025-10-02" },
  { title: "告別式", start: "2025-10-02", extendedProps: { category: "告別式" } },
  { title: "會議", start: "2025-10-03" },
  { title: "邀請", start: "2025-10-04" },
  { title: "邀請", start: "2025-10-05" },
  { title: "告別式", start: "2025-10-06", extendedProps: { category: "告別式" } },
  { title: "祝賀", start: "2025-10-14" },
  { title: "告別式", start: "2025-10-22", extendedProps: { category: "告別式" } },
  { title: "會勘", start: "2025-10-22" },
  { title: "邀請", start: "2025-10-23" },
  { title: "邀請", start: "2025-10-24" },
  { title: "邀請", start: "2025-10-25" },
  { title: "告別式", start: "2025-10-25", extendedProps: { category: "告別式" } },
  { title: "邀請", start: "2025-10-31" },
];

/* FullCalendar */
const calRef = ref(null);
const monthTitle = ref("");

const calOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin, iCalendarPlugin],
  initialView: "dayGridMonth",
  headerToolbar: false,
  locale: zhTw, // 直接套 zh-tw 物件
  firstDay: 0,
  fixedWeekCount: true,
  dayMaxEventRows: 4,
  eventDisplay: "block",
  eventContent: renderEventContent,
  eventSources: ICS_URL ? [{ url: ICS_URL, format: "ics" }] : [{ events: mockEvents }],
  datesSet() {
    updateMonthTitle();
  },
});

function updateMonthTitle() {
  const api = calRef.value && calRef.value.getApi ? calRef.value.getApi() : null;
  if (!api) return;
  const d = api.getDate();
  monthTitle.value = `${d.getFullYear()}年 ${d.getMonth() + 1}月`;
}
function calPrev() {
  const api = calRef.value.getApi();
  api.prev();
  updateMonthTitle();
}
function calNext() {
  const api = calRef.value.getApi();
  api.next();
  updateMonthTitle();
}
function downloadICS() {
  if (ICS_URL) window.open(ICS_URL, "_blank", "noopener");
  else alert("尚未設定 iCal 來源（VITE_MAYOR_ICS_URL）。");
}

onMounted(updateMonthTitle);
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
