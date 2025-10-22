<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <NewsSidebar
        class="hidden lg:block w-56 shrink-0 text-xl"
        :items="[
          { label: '最新消息', name: 'news-latest' },
          { label: '新聞稿', name: 'news-press' },
          { label: '招標公告', name: 'news-tenders' },
          { label: '徵才公告', name: 'news-jobs' },
          { label: '活動訊息', name: 'news-events' },
        ]"
      />

      <main class="flex-1 min-w-0">
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              最新消息
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

        <section class="mt-5 rounded-lg border border-slate-200 bg-white p-4">
          <form class="flex flex-col gap-3 md:flex-row md:items-end md:flex-wrap">
            <div class="flex flex-col">
              <label for="start" class="text-lg font-medium text-slate-700 mb-1"
                >開始日期</label
              >
              <Calendar
                id="start"
                v-model="filters.startDate"
                date-format="yy/mm/dd"
                show-icon
                inputId="start"
                input-class="!w-44 text-xl"
                :max-date="filters.endDate || undefined"
                :pt="{ input: { root: 'w-44 text-xl' } }"
              />
            </div>

            <div class="flex flex-col">
              <label for="end" class="text-lg font-medium text-slate-700 mb-1"
                >結束日期</label
              >
              <Calendar
                id="end"
                v-model="filters.endDate"
                date-format="yy/mm/dd"
                show-icon
                inputId="end"
                input-class="!w-44 text-xl"
                :min-date="filters.startDate || undefined"
                :pt="{ input: { root: 'w-44 text-xl' } }"
              />
            </div>

            <div class="flex-1 min-w-[220px]">
              <label for="kw" class="text-lg font-medium text-slate-700 mb-1"
                >關鍵字</label
              >
              <div class="flex items-center gap-2">
                <span class="p-input-icon-left flex-1">
                  <InputText
                    id="kw"
                    v-model="filters.keyword"
                    placeholder="輸入關鍵字"
                    class="w-full text-xl"
                    @keyup.enter="search"
                  />
                </span>
                <Button
                  label="搜尋"
                  icon="pi pi-search"
                  class="text-xl"
                  @click.prevent="search"
                />
                <Button
                  label="清除"
                  severity="secondary"
                  icon="pi pi-filter-slash"
                  class="text-xl"
                  @click.prevent="clearFilters"
                />
              </div>
            </div>
          </form>
        </section>

        <section
          :class="[
            'mt-4 rounded-lg border border-slate-200 bg-white p-2 md:p-3',
            fontSizeClasses.body,
          ]"
        >
          <DataTable
            :value="pagedItems"
            data-key="id"
            :row-hover="true"
            responsive-layout="stack"
            breakpoint="768px"
            class="w-full"
            :pt="{
              table: { class: 'w-full' },
              headerrow: { class: 'bg-slate-50' },
            }"
            @row-click="onRowClick"
            :empty-message="emptyText"
          >
            <Column header="分類名稱" field="categoryText" style="width: 140px">
              <template #body="{ data }">
                <Tag :value="data.categoryText" severity="success" class="text-base" />
              </template>
            </Column>

            <Column header="標題" field="title" :style="{ width: 'auto' }">
              <template #body="{ data }">
                <div class="flex items-center gap-2">
                  <span class="line-clamp-2 md:line-clamp-2">{{ data.title }}</span>
                </div>
              </template>
            </Column>

            <Column
              header="發布單位"
              field="dept"
              style="width: 140px"
              class="whitespace-nowrap"
            />

            <Column
              header="發布日期"
              field="date"
              style="width: 130px"
              class="whitespace-nowrap"
            >
              <template #body="{ data }">
                <span>{{ formatDate(data.date) }}</span>
              </template>
            </Column>

            <Column header="點閱率" field="views" style="width: 90px" class="text-right">
              <template #body="{ data }">
                <span class="tabular-nums">{{ data.views }}</span>
              </template>
            </Column>
          </DataTable>

          <div class="mt-3 flex items-center justify-between gap-3">
            <div class="text-lg text-slate-500">
              顯示第
              <span class="font-semibold">{{ pageFirst + 1 }}</span>
              筆至
              <span class="font-semibold">{{
                Math.min(pageFirst + rows, filteredItems.length)
              }}</span>
              筆，共
              <span class="font-semibold">{{ filteredItems.length }}</span>
              筆
            </div>

            <Paginator
              :first="pageFirst"
              :rows="rows"
              :total-records="filteredItems.length"
              :rows-per-page-options="[10, 20, 50]"
              class="text-xl"
              @page="onPage"
            />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
/*
  「所有可見文字」+2 級（Tailwind 標準階梯）：
  - text-xs → text-base
  - text-sm → text-lg
  - text-base → text-xl
  - text-lg → text-2xl
  - text-xl → text-3xl
  - text-2xl → text-4xl
  - text-3xl → text-5xl
  同時調整：
  - Breadcrumb/Sidebar/Paginator/Button/InputText/Calendar 的文字大小以 class 或 pt 傳入
  - 自訂字級控制（fontScale）整體上移 2 級：sm→小但放大、md→預設放大、lg→更大
*/

import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import NewsSidebar from "@/components/news/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";

const breadcrumbHome = { icon: "pi pi-home", to: { name: "home" } };
const breadcrumbModel = [
  { label: "熱門消息", to: { name: "news" } },
  { label: "最新消息" },
];

const fontScale = ref(localStorage.getItem("news.font") || "md");
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
  localStorage.setItem("news.font", s);
}
function printPage() {
  window.print();
}

const filters = ref({
  startDate: null,
  endDate: null,
  keyword: "",
});
function clearFilters() {
  filters.value.startDate = null;
  filters.value.endDate = null;
  filters.value.keyword = "";
  pageFirst.value = 0;
}
function search() {
  pageFirst.value = 0;
}

const rawItems = ref([]);

function createMock() {
  const cats = [
    { key: "latest", text: "最新消息" },
    { key: "announcements", text: "政令宣導" },
    { key: "events", text: "活動專區" },
  ];
  const depts = ["民政課", "財政課", "農經課", "社會課", "觀光服務所"];
  const titles = [
    "雲林縣林內鄉公所代為公告本鄉鹿谷湖本村自強路1巷7號後方之斗六市咬狗段0202-0001地號土地內有（無）主墳邊遷葬事宜",
    "苗栗縣苑裡鎮公所辦理114年度苑裡鎮清掃生命紀念園秋季法會活動須知",
    "屏東縣屏東市公所最新通知",
    "「屏東縣枋山鄉鄉有財產管理自治條例」總說明、逐條說明、條文、公告及令",
    "經濟部標準檢驗局訂於114年10月至11月期間辦理「中小企業平價綠電專案」說明會",
  ];
  const today = new Date();
  const arr = [];
  for (let i = 0; i < 128; i++) {
    const c = cats[Math.floor(Math.random() * cats.length)];
    const d = new Date(today);
    d.setDate(d.getDate() - Math.floor(Math.random() * 90));
    arr.push({
      id: i + 1,
      category: c.key,
      categoryText: c.text,
      title: titles[Math.floor(Math.random() * titles.length)],
      dept: depts[Math.floor(Math.random() * depts.length)],
      date: d,
      views: Math.floor(Math.random() * 3500),
      isNew: (today - d) / (1000 * 60 * 60 * 24) <= 7,
    });
  }
  rawItems.value = arr.sort((a, b) => b.date - a.date);
}
onMounted(createMock);

const filteredItems = computed(() => {
  const { startDate, endDate, keyword } = filters.value;
  const kw = (keyword || "").trim();
  return rawItems.value.filter((item) => {
    if (startDate && item.date < normalizeDate(startDate)) return false;
    if (endDate && item.date > endOfDay(endDate)) return false;
    if (kw) {
      const hay = `${item.title} ${item.dept} ${item.categoryText}`.toLowerCase();
      if (!hay.includes(kw.toLowerCase())) return false;
    }
    return true;
  });
});

const pageFirst = ref(0);
const rows = ref(10);
const pagedItems = computed(() =>
  filteredItems.value.slice(pageFirst.value, pageFirst.value + rows.value)
);
function onPage(e) {
  pageFirst.value = e.first;
  rows.value = e.rows;
}

const emptyText = "查無符合條件的資料";

const router = useRouter();
function onRowClick(evt) {
  // 可在此導向詳文
}

function formatDate(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const da = String(dt.getDate()).padStart(2, "0");
  return `${y}/${m}/${da}`;
}
function normalizeDate(d) {
  const nd = new Date(d);
  nd.setHours(0, 0, 0, 0);
  return nd;
}
function endOfDay(d) {
  const nd = new Date(d);
  nd.setHours(23, 59, 59, 999);
  return nd;
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
  .p-button,
  .p-paginator,
  .border-t,
  .border-b {
    display: none !important;
  }
  main {
    width: 100% !important;
  }
  h1 {
    margin-bottom: 8px;
  }
  .p-datatable {
    border: none !important;
    box-shadow: none !important;
  }
}
</style>
