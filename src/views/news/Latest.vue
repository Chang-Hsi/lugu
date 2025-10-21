<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <!-- 側欄：分類選單 -->
      <NewsSidebar
        class="hidden lg:block w-56 shrink-0"
        :items="[
          { label: '最新消息', name: 'news-latest' },
          { label: '新聞稿', name: 'news-press' },
          { label: '招標公告', name: 'news-tenders' },
          { label: '徵才公告', name: 'news-jobs' },
          { label: '活動訊息', name: 'news-events' },
        ]"
      />

      <!-- 主內容 -->
      <main class="flex-1 min-w-0">
        <!-- 標題列 -->
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              最新消息
            </h1>

            <!-- 麵包屑 -->
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

        <!-- 篩選區塊 -->
        <section
          class="mt-5 rounded-lg border border-slate-200 bg-white p-4"
          aria-label="搜尋與篩選"
        >
          <form class="flex flex-col gap-3 md:flex-row md:items-end md:flex-wrap">
            <!-- 開始日期 -->
            <div class="flex flex-col">
              <label for="start" class="text-sm font-medium text-slate-700 mb-1"
                >開始日期</label
              >
              <Calendar
                id="start"
                v-model="filters.startDate"
                date-format="yy/mm/dd"
                show-icon
                inputId="start"
                input-class="!w-44"
                :max-date="filters.endDate || undefined"
                :pt="{ input: { root: 'w-44' } }"
              />
            </div>

            <!-- 結束日期 -->
            <div class="flex flex-col">
              <label for="end" class="text-sm font-medium text-slate-700 mb-1"
                >結束日期</label
              >
              <Calendar
                id="end"
                v-model="filters.endDate"
                date-format="yy/mm/dd"
                show-icon
                inputId="end"
                input-class="!w-44"
                :min-date="filters.startDate || undefined"
                :pt="{ input: { root: 'w-44' } }"
              />
            </div>

            <!-- 關鍵字 -->
            <div class="flex-1 min-w-[220px]">
              <label for="kw" class="text-sm font-medium text-slate-700 mb-1"
                >關鍵字</label
              >
              <div class="flex items-center gap-2">
                <span class="p-input-icon-left flex-1">
                  <InputText
                    id="kw"
                    v-model="filters.keyword"
                    placeholder="輸入關鍵字"
                    class="w-full"
                    @keyup.enter="search"
                  />
                </span>
                <Button label="搜尋" icon="pi pi-search" @click.prevent="search" />
                <Button
                  label="清除"
                  severity="secondary"
                  icon="pi pi-filter-slash"
                  @click.prevent="clearFilters"
                />
              </div>
            </div>
          </form>
        </section>

        <!-- 列表 -->
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
                <Tag :value="data.categoryText" severity="success" class="text-xs" />
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

          <!-- 分頁表 -->
          <div class="mt-3 flex items-center justify-between gap-3">
            <div class="text-sm text-slate-500">
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
              @page="onPage"
            />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
/**
 * 需求：
 * - Tailwind 佈局
 * - PrimeVue：Breadcrumb、Calendar、InputText、Button、DataTable、Column、Tag、Paginator
 * - 純前端假資料＋UI 行為（搜尋/篩選/分頁/字級/列印）
 */
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import NewsSidebar from "@/components/news/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";

// ————————————————————
// 側欄分類（對應你的 router children）

// 麵包屑
const breadcrumbHome = { icon: "pi pi-home", to: { name: "home" } };
const breadcrumbModel = [
  { label: "熱門消息", to: { name: "news" } },
  { label: "最新消息" },
];

// ————————————————————
// 字級（大中小）視覺縮放
const fontScale = ref(localStorage.getItem("news.font") || "md");
const fontSizeClasses = computed(() => {
  switch (fontScale.value) {
    case "sm":
      return { title: "text-2xl", body: "text-[0.95rem]" };
    case "lg":
      return { title: "text-4xl", body: "text-[1.1rem]" };
    default:
      return { title: "text-3xl", body: "text-base" };
  }
});
function setFont(s) {
  fontScale.value = s;
  localStorage.setItem("news.font", s);
}
function printPage() {
  window.print();
}

// ————————————————————
// 篩選狀態
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

// 假資料（示意）
const rawItems = ref([]);

// 產生示意資料
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

// 篩選後資料
const filteredItems = computed(() => {
  const { startDate, endDate, keyword } = filters.value;
  const kw = (keyword || "").trim();
  return rawItems.value.filter((item) => {
    // 日期
    if (startDate && item.date < normalizeDate(startDate)) return false;
    if (endDate && item.date > endOfDay(endDate)) return false;
    // 關鍵字
    if (kw) {
      const hay = `${item.title} ${item.dept} ${item.categoryText}`.toLowerCase();
      if (!hay.includes(kw.toLowerCase())) return false;
    }
    return true;
  });
});

// 分頁
const pageFirst = ref(0); // 目前第一筆 index
const rows = ref(10); // 每頁筆數
const pagedItems = computed(() => {
  return filteredItems.value.slice(pageFirst.value, pageFirst.value + rows.value);
});
function onPage(e) {
  pageFirst.value = e.first;
  rows.value = e.rows;
}

const emptyText = "查無符合條件的資料";

// 點列（可依你的實際詳文路由改寫）
const router = useRouter();
function onRowClick(evt) {
  // 若你有詳文路由，改成：router.push({ name: 'news-article', params: { id: evt.data.id } })
  // 這裡先示意跳同頁不動作
}

// ————————————————————
// 工具：日期格式
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
/* 列印樣式（僅此頁） */
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
