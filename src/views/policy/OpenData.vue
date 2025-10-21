<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <!-- 側欄：分類選單 -->
      <PolicySidebar
        class="hidden lg:block w-56 shrink-0"
        :items="[
          { label: '政策相關', name: 'policy-related' },
          { label: '年度經費', name: 'policy-annual-expense' },
          { label: '資訊公開', name: 'policy-open-data' },
          { label: '廉政園地', name: 'policy-integrity' },
          { label: '施工工程', name: 'policy-construction' },
          { label: '最新債務訊息', name: 'policy-debt' },
          { label: '災後復建審議', name: 'policy-post-disaster' },
          { label: '永續提升人行安全計畫', name: 'policy-pedestrian-safety' },
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
              政策相關
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

        <!-- 標籤按鈕（深綠） -->
        <div class="mt-4 flex flex-wrap items-center gap-3" aria-label="快速篩選">
          <Button
            v-for="t in subTypes"
            :key="t"
            size="large"
            :label="t"
            :pt="{
              root: {
                class:
                  '!bg-emerald-700 hover:!bg-emerald-800 !text-white ' +
                  '!border-emerald-700 focus:!ring-2 focus:!ring-emerald-900 ' +
                  'px-5 py-2 !font-semibold rounded-xl',
              },
            }"
            @click="toggleSub(t)"
          />
          <Button
            v-if="activeSub"
            size="large"
            label="清除篩選"
            severity="secondary"
            outlined
            :pt="{ root: { class: 'px-5 py-2 rounded-xl' } }"
            @click="toggleSub(activeSub)"
          />
        </div>

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
            <Column header="分類名稱" style="width: 160px">
              <template #body="{ data }">
                <div class="flex flex-col leading-tight">
                  <span class="text-slate-700">{{ data.mainType }}</span>
                  <span class="text-slate-500 text-sm">{{ data.subType }}</span>
                </div>
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
                <span>{{ fmt(data.date) }}</span>
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import PolicySidebar from "@/components/policy/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";

const route = useRoute();

// ——— Sidebar items ———
const sideItems = [
  { label: "政策相關", name: "policy-related" },
  { label: "年度經費", name: "policy-annual-expense" },
  { label: "資訊公開", name: "policy-open-data" },
  { label: "廉政園地", name: "policy-integrity" },
  { label: "施工工程", name: "policy-construction" },
  { label: "最新債務訊息", name: "policy-debt" },
  { label: "災後復建審議", name: "policy-post-disaster" },
  { label: "永續提升人行安全計畫", name: "policy-pedestrian-safety" },
];

// 標題/麵包屑
const pageTitle = computed(() => route.meta?.title || "法規政策");
const breadcrumbHome = { icon: "pi pi-home", to: { name: "home" } };
const breadcrumbModel = computed(() => [
  { label: "法規政策", to: { name: "policy" } },
  { label: pageTitle.value },
]);

// 字級
const fontScale = ref(localStorage.getItem("policy.font") || "md");
const fontSizeClasses = computed(() =>
  fontScale.value === "sm"
    ? { title: "text-2xl", body: "text-[0.95rem]" }
    : fontScale.value === "lg"
    ? { title: "text-4xl", body: "text-[1.1rem]" }
    : { title: "text-3xl", body: "text-base" }
);
function setFont(s) {
  fontScale.value = s;
  localStorage.setItem("policy.font", s);
}
function printPage() {
  window.print();
}

// 篩選
const filters = ref({ startDate: null, endDate: null, keyword: "" });
function clearFilters() {
  filters.value = { startDate: null, endDate: null, keyword: "" };
  pageFirst.value = 0;
}
function search() {
  pageFirst.value = 0;
}

// —— Tag 快速篩選（子分類）——
const subTypes = ["施政計畫", "法規增修", "政策宣導", "遊說法專區"];
const activeSub = ref(""); // 空=全部
function toggleSub(t) {
  activeSub.value = activeSub.value === t ? "" : t;
  pageFirst.value = 0;
}

// 假資料（主分類=側欄頁名；子分類=subTypes）
const rawItems = ref([]);
onMounted(() => {
  const main = pageTitle.value; // 依目前頁當主分類名稱（如：政策相關）
  const depts = ["政風室", "秘書室", "工程課", "清潔隊", "人事室", "社會課"];
  const titles = [
    "環境部114年6月30日環部循字第xxxx號公告修正「容器回收清除處理費費率」",
    "鹿谷鄉參加南投縣全民運動會競賽優勝獎勵要點",
    "113年度施政計畫",
    "本所組織自治條例",
    "遊說法資訊專區",
    "永續提升人行安全計畫",
  ];
  const today = new Date();
  const arr = [];
  for (let i = 0; i < 95; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - Math.floor(Math.random() * 360));
    const sub = subTypes[Math.floor(Math.random() * subTypes.length)];
    arr.push({
      id: i + 1,
      mainType: main, // 第一列：主分類（如 政策相關）
      subType: sub, // 第二列：子分類（如 法規增修）
      title: titles[Math.floor(Math.random() * titles.length)],
      dept: depts[Math.floor(Math.random() * depts.length)],
      date: d,
      views: Math.floor(Math.random() * 1200) + 200,
    });
  }
  rawItems.value = arr.sort((a, b) => b.date - a.date);
});

// 套用篩選
const filteredItems = computed(() => {
  const { startDate, endDate, keyword } = filters.value;
  const kw = (keyword || "").toLowerCase();

  return rawItems.value.filter((r) => {
    // 子分類（標籤）篩選
    if (activeSub.value && r.subType !== activeSub.value) return false;

    // 日期
    if (startDate && r.date < startOfDay(startDate)) return false;
    if (endDate && r.date > endOfDay(endDate)) return false;

    // 關鍵字（← 這裡用變數接字串，加上括號）
    if (kw) {
      const hay = `${r.title} ${r.dept} ${r.mainType} ${r.subType}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }

    return true;
  });
});

// 分頁
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

// 工具：日期
function fmt(d) {
  const x = new Date(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const da = String(x.getDate()).padStart(2, "0");
  return `${y}/${m}/${da}`;
}
function startOfDay(d) {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}
function endOfDay(d) {
  const n = new Date(d);
  n.setHours(23, 59, 59, 999);
  return n;
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
