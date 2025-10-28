<!-- src/components/HeroInfoMobile.vue -->
<template>
  <section class="mx-auto px-4 py-12" role="region" aria-label="資訊看板">
    <h2 class="text-center text-4xl md:text-5xl font-extrabold text-slate-800">
      資訊看板
    </h2>

    <div class="mt-8 flex flex-wrap justify-center gap-8">
      <article
        v-for="(card, i) in cards"
        :key="card.key"
        class="basis-[calc(50%-16px)] max-w-[360px]"
      >
        <div
          class="mx-auto w-24 h-24 sm:w-40 sm:h-40 rounded-2xl bg-white shadow flex items-center justify-center"
        >
          <i
            :class="['pi', card.pi, 'text-emerald-500']"
            :style="{ '--p-icon-size': '2rem' }"
          />
        </div>

        <div class="mt-4 text-center">
          <div class="text-emerald-500 font-extrabold tracking-wider text-lg">
            POINT {{ i + 1 }}
          </div>
          <div class="mt-2 text-slate-800 text-xl font-semibold">{{ card.desc }}</div>
          <Button
            label="more"
            class="mt-3 !px-4 !py-1.5 !rounded-full !text-base !bg-white !text-slate-700 !border !border-gray-300 shadow-sm hover:!bg-gray-50"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
// 需求重點：改為 2 欄正方形卡片、中央 pi 圖標、下方簡述與小型 more 按鈕；不再顯示 items 清單
import { ref } from "vue";
import Button from "primevue/button";

const cards = ref([
  { key: "p1", pi: "pi-star", desc: "最新消息" },
  { key: "p2", pi: "pi-megaphone", desc: "政令宣導" },
  { key: "p3", pi: "pi-sliders-h", desc: "活動專區" },
  { key: "p4", pi: "pi-shield", desc: "防災專區" },
  { key: "p5", pi: "pi-bolt", desc: "永續提升" },
]);
</script>

<style scoped>
/* 若遇到過窄裝置，保證卡片不被擠壓變形 */
@media (max-width: 360px) {
  .basis-\[calc\(50\%-16px\)\] {
    flex-basis: calc(50% - 12px);
  }
}
</style>
