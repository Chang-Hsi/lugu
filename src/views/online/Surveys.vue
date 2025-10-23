<!-- src/views/online/Surveys.vue -->
<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <OnlineSidebar class="hidden lg:block text-xl" :items="onlineMenu" />
      <main class="flex-1 min-w-0" id="main">
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              問卷調查
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
            :empty-message="emptyText"
          >
            <!-- 編號 -->
            <Column header="編號" style="width: 90px" class="text-center">
              <template #body="{ index }">
                <span class="tabular-nums">{{ pageFirst + index + 1 }}</span>
              </template>
            </Column>

            <!-- 問卷名稱 -->
            <Column header="問卷名稱">
              <template #body="{ data }">
                <span class="line-clamp-2 md:line-clamp-2">{{ data.title }}</span>
              </template>
            </Column>

            <!-- 日期 -->
            <Column header="日期" style="width: 120px" class="whitespace-nowrap">
              <template #body="{ data }">
                <span>{{ formatDate(data.date) }}</span>
              </template>
            </Column>

            <!-- 項目格式（填問卷） -->
            <Column header="項目格式" style="width: 160px; text-align: right">
              <template #body="{ data }">
                <Button label="填問卷" size="small" @click="openSurvey(data)" />
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import OnlineSidebar from "@/components/online/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";

const router = useRouter();

/* 側欄 */
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

/* 麵包屑 */
const bcHome = { icon: "pi pi-home", to: { name: "home" } };
const bcModel = [
  { label: "線上服務交流", to: { name: "online" } },
  { label: "問卷調查" },
];

/* 字級（整體 +2 階） */
const fontScale = ref(localStorage.getItem("online.font") || "md");
const fontSizeClasses = computed(() =>
  fontScale.value === "sm"
    ? { title: "text-4xl", body: "text-lg" }
    : fontScale.value === "lg"
    ? { title: "text-6xl", body: "text-2xl" }
    : { title: "text-5xl", body: "text-xl" }
);

/* —— 假資料 —— */
const rawItems = ref([]);

/** 建立示意資料（可換成真 API） */
function createMock() {
  // 站內問卷（會到 /survey/visitor-satisfaction）
  const first = {
    id: 1,
    title: "「遊客服務滿意度」網路問卷調查",
    date: null, // null = 無限制
    slug: "visitor-satisfaction", // ← 加上 slug
    link: null, // 站內的就不需要 link
  };

  // 其它示意：有些走外連（無 slug）
  const titles = [
    "本所網站使用體驗調查",
    "路燈報修流程滿意度調查",
    "鄉政施政白皮書民意調查",
    "親子活動滿意度回饋",
    "觀光導覽與停車動線意見徵集",
    "災害通報系統使用情形調查",
    "關懷據點服務滿意度調查",
    "公共服務窗口滿意度調查",
  ];
  const links = [
    "https://example.com/survey/2",
    "https://example.com/survey/3",
    "https://example.com/survey/4",
  ];

  const today = new Date();
  const others = titles.map((t, i) => {
    const d = Math.random() < 0.5 ? null : new Date(today);
    if (d) d.setDate(d.getDate() - Math.floor(Math.random() * 60));
    return {
      id: i + 2,
      title: t,
      date: d,
      slug: null, // ← 外部的沒有 slug
      link: links[Math.floor(Math.random() * links.length)],
    };
  });

  rawItems.value = [first, ...others];
}

onMounted(createMock);

/* 分頁 */
const pageFirst = ref(0);
const rows = ref(10);
const filteredItems = computed(() => rawItems.value);
const pagedItems = computed(() =>
  filteredItems.value.slice(pageFirst.value, pageFirst.value + rows.value)
);
function onPage(e) {
  pageFirst.value = e.first;
  rows.value = e.rows;
}

/* 點「填問卷」行為 */
function openSurvey(row) {
  let href = "#";
  if (row.slug) {
    href = router.resolve({ name: "survey-detail", params: { slug: row.slug } }).href;
  } else if (row.link) {
    href = row.link;
  } else {
    console.warn("Survey row missing slug/link:", row);
    return;
  }
  window.open(href, "_blank", "noopener,noreferrer");
}

const emptyText = "目前沒有可顯示的問卷";

/* 日期顯示：null → 無限制 */
function formatDate(d) {
  if (!d) return "無限制";
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const da = String(dt.getDate()).padStart(2, "0");
  return `${y}/${m}/${da}`;
}
</script>
