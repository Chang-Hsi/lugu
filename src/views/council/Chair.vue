<template>
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex gap-6">
      <!-- 左側：代表會側欄 -->
      <CouncilSidebar class="hidden lg:block w-56 shrink-0 text-xl" :items="leftMenu" />

      <!-- 主內容 -->
      <main class="flex-1 min-w-0" id="main">
        <!-- 標題列 -->
        <header class="flex items-end justify-between gap-4">
          <div class="min-w-0">
            <h1
              :class="['font-extrabold text-slate-800 truncate', fontSizeClasses.title]"
            >
              主席介紹
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

        <!-- 子分類快速篩選（放在麵包屑下、內容之上） -->
        <!-- 新增：subTypes 位置調整到這裡 -->
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

        <!-- 內容 -->
        <!-- 調整：移除右側欄，內容改為單欄 -->
        <section
          :class="[
            'mt-5 rounded-lg border border-slate-200 bg-white p-6 md:p-8 leading-relaxed',
            fontSizeClasses.body,
          ]"
          aria-label="主席介紹內容"
        >
          <!-- 主席的話 -->
          <h2 class="text-3xl font-bold mb-4">主席的話</h2>

          <div class="flex flex-col items-center">
            <img
              src="https://www.lugu.gov.tw:442/z39be3faa/d084236cbc/SuperManagerFileLoder/%E4%B8%BB%E5%B8%AD%EF%BC%9A%E6%9E%97%E6%99%BA%E9%B4%BB.jpg"
              alt="主席照片"
              class="w-48 object-cover rounded shadow mb-6"
              loading="lazy"
              decoding="async"
            />
          </div>

          <p class="text-slate-800">
            鹿谷是台灣最出名茶鄉，風景秀麗、氣候宜人，終年雲霧籠罩，年均溫二十幾度，舒爽的環境適合人居，更是凍頂烏龍茶最佳生長條件，全鄉經濟多為無煙囪產業，包括茶、冬筍、旅遊、餐飲等，民風儉樸善良，農業休閒經濟活絡，天然資源及生態豐富，是全台數一數二的綠色鄉鎮。
          </p>
          <p class="mt-4 text-slate-800">
            鹿谷鄉民代表會是鄉內惟一的民意機關，代表鄉民監督鄉公所施政，並整合有限的公共資源做最適當的運用，近年來民意要求逐年提昇，本會不但做為鄉民與政府的橋樑，更應該站在民意的浪頭即時反映民意，並協助爭取民意的需求，扮演鹿谷進步的火車頭。
          </p>
          <p class="mt-4 text-slate-800">
            智鴻受本會代表錯愛擔任22屆主席，時時以民為念，除了提供代表最好的問政環境，也配合全體代表秉持理性溝通的精神，督促鄉公所服務的效率與品質，智鴻相信只要所會互信合作，一定能在鄉鎮激烈的競爭與民意高度的期待下，開創一個更優質更進步的鹿谷鄉。
          </p>

          <!-- 副主席的話 -->
          <h2 class="text-3xl font-bold mt-10 mb-4">副主席的話</h2>

          <div class="flex flex-col items-center">
            <img
              src="https://www.lugu.gov.tw:442/z39be3faa/d084236cbc/SuperManagerFileLoder/%E5%89%AF%E4%B8%BB%E5%B8%AD%EF%BC%9A%E9%99%B3%E5%90%9B%E5%AE%9C.jpg"
              alt="副主席照片"
              class="w-48 object-cover rounded shadow mb-6"
              loading="lazy"
              decoding="async"
            />
          </div>

          <p class="text-slate-800">
            鹿谷鄉，是一個充滿獨特性之自然人文觀光風情以及物產豐富的鄉鎮，全區群山綿延、景致秀麗，尤其是茶園景觀更是讓人迷戀。本鄉坐擁四大風景區：溪頭森林遊憩勝地、杉林溪森林遊樂區、鳳凰谷鳥園風景特定區、小半天休閒農業區；更有著名麒麟潭，為進入鳳凰谷風景區的第一站，波光粼粼，映照青山紅瓦，景致優美，湖光山色，為南投八大勝景之一。
          </p>
          <p class="mt-4 text-slate-800">
            鹿谷鄉早年就以茶產業聞名，凍頂茶享譽國際，雖時過境遷，產業生態環境改變，鹿谷茶仍在國際茶葉市場屹立不搖，近年來鹿谷子弟鑽研精進製茶技術，幾近爐火純青境界，凍頂烏龍茶—冬茶、春茶年度比賽，屢創新境、轟動全國、海內外。
          </p>
          <p class="mt-4 text-slate-800">
            鹿谷鄉亦充滿濃濃人情味，有著山城古意人的純樸性格，我們竭誠歡迎全台暨世界各地的好朋友，蒞臨本鄉來欣賞好山好水、吸取芬多精，吃竹筍、品好茶，滌淨一身的風塵，然後再出發迎向美好未來人生，相信大家會跟我一樣，喜歡上鹿谷茶鄉。
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
/*
  調整重點：
  1) 子分類快速篩選移至麵包屑下（新增 nav 區塊）
  2) 移除右側欄，改為單欄內容
  3) 文字維持 +2 等級（h1: 5xl/6xl、內文: text-xl、小標: 3xl）
*/
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import CouncilSidebar from "@/components/council/Sidebar.vue";
import Breadcrumb from "primevue/breadcrumb";
import Button from "primevue/button";

const router = useRouter();

/* 左側目錄 */
const leftMenu = [
  { label: "鄉民代表會", to: { name: "council-assembly" } },
  { label: "出國考察報告", to: { name: "council-overseas-reports" } },
  { label: "代表會活動", to: { name: "council-activities" } },
  { label: "會議資訊", to: { name: "council-meetings" } },
];

/* 子分類（點擊導頁；除了本頁其餘暫用同畫面） */
const subTypes = [
  { label: "主席介紹", to: { name: "council-chair" } },
  { label: "組織介紹", to: { name: "council-organization" } },
  { label: "組織架構", to: { name: "council-organization" } },
  { label: "代表服務電話", to: { name: "council-organization" } },
  { label: "法規公告宣導", to: { name: "council-organization" } },
];
function goSub(to) {
  router.push(to);
}

/* 麵包屑 */
const breadcrumbHome = { icon: "pi pi-home", to: { name: "home" } };
const breadcrumbModel = computed(() => [
  { label: "代表會", to: { name: "council" } },
  { label: "鄉民代表會", to: { name: "council-assembly" } },
  { label: "主席介紹" },
]);

/* 字級（+2 等級） */
const fontScale = ref(localStorage.getItem("council.font") || "md");
const fontSizeClasses = computed(() =>
  fontScale.value === "sm"
    ? { title: "text-4xl", body: "text-lg" }
    : fontScale.value === "lg"
    ? { title: "text-6xl", body: "text-2xl" }
    : { title: "text-5xl", body: "text-xl" }
);
function setFont(s) {
  fontScale.value = s;
  localStorage.setItem("council.font", s);
}
function printPage() {
  window.print();
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
