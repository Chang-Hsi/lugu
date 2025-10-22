<!-- src/views/online/SurveyDetail.vue -->
<template>
  <div class="mx-auto max-w-5xl px-4 py-8">
    <!-- 麵包屑 + 標題 -->
    <header class="mb-6">
      <nav class="text-sm text-slate-600">
        <RouterLink :to="{ name: 'home' }" class="hover:underline">首頁</RouterLink>
        <span class="mx-2">/</span>
        <RouterLink :to="{ name: 'online' }" class="hover:underline"
          >線上服務交流</RouterLink
        >
        <span class="mx-2">/</span>
        <span>問卷填寫</span>
      </nav>
      <h1 class="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
        「遊客服務滿意度」網路問卷調查
      </h1>
    </header>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Q1：多選（樣式標準） -->
      <section class="rounded-md border border-emerald-200 bg-white">
        <div class="border-b p-4 text-emerald-900 font-bold flex items-center gap-2">
          <span class="text-rose-600">*</span>
          第1題－請問您這次從出發地到鹿谷鳳凰景區 旅遊主要利用的交通工具是：
        </div>
        <div class="p-4">
          <ul class="space-y-3">
            <li v-for="opt in q1Options" :key="opt.value" class="flex items-start gap-3">
              <input
                type="checkbox"
                :id="'q1-' + opt.value"
                v-model="form.q1"
                :value="opt.value"
                class="mt-1 h-4 w-4"
              />
              <label :for="'q1-' + opt.value" class="cursor-pointer">{{
                opt.label
              }}</label>
            </li>
          </ul>
          <p v-if="submitted && form.q1.length === 0" class="mt-3 text-rose-600">
            此題為必填。
          </p>
        </div>
      </section>

      <!-- Q2～Q5：單選 5 點量表（樣式與 Q1 相同） -->
      <section
        v-for="blk in likertBlocks"
        :key="blk.key"
        class="rounded-md border border-emerald-200 bg-white"
      >
        <div class="border-b p-4 text-emerald-900 font-bold flex items-center gap-2">
          <span class="text-rose-600">*</span>
          {{ blk.title }}
        </div>
        <div class="p-4">
          <ul class="space-y-3">
            <li
              v-for="opt in likertOptions"
              :key="opt.value"
              class="flex items-start gap-3"
            >
              <input
                type="radio"
                :name="blk.key"
                :id="blk.key + '-' + opt.value"
                v-model="form[blk.key]"
                :value="opt.value"
                class="mt-1 h-4 w-4"
              />
              <label :for="blk.key + '-' + opt.value" class="cursor-pointer">{{
                opt.label
              }}</label>
            </li>
          </ul>
          <p v-if="submitted && !form[blk.key]" class="mt-3 text-rose-600">
            此題為必填。
          </p>
        </div>
      </section>

      <!-- reCAPTCHA（示意） -->
      <section class="rounded-md border border-emerald-200 bg-white p-6">
        <div
          class="mx-auto max-w-md border border-gray-200 rounded-md p-4 flex items-center justify-between"
        >
          <label class="inline-flex items-center gap-3">
            <input type="checkbox" v-model="form.captcha" class="h-5 w-5" />
            <span>我不是機器人</span>
          </label>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/1200px-RecaptchaLogo.svg.png"
            alt="reCAPTCHA（示意）"
            class="h-14 md:h-14 opacity-80"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p v-if="submitted && !form.captcha" class="mt-3 text-center text-rose-600">
          請勾選驗證。
        </p>
      </section>

      <!-- 送出/取消 -->
      <div class="flex items-center justify-center gap-4">
        <button
          type="submit"
          class="px-5 py-2 rounded-md bg-emerald-700 text-white hover:bg-emerald-800"
        >
          送出問卷
        </button>
        <RouterLink
          :to="{ name: 'online-surveys' }"
          class="px-5 py-2 rounded-md border hover:bg-slate-50"
        >
          取消
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

/* Q1 選項 */
const q1Options = [
  { value: "car", label: "自小客車" },
  { value: "tour-bus", label: "大型遊覽車" },
  { value: "mass", label: "大眾運輸（含鐵路、公、民營客運）" },
  { value: "scenic-bus", label: "旅遊專車(含觀光巴士、觀光列車)" },
  { value: "taxi", label: "出租汽車（含計程車）" },
  { value: "walk", label: "徒步" },
  { value: "motorcycle", label: "機車" },
  { value: "minibus", label: "小型巴士" },
  { value: "bike", label: "自行車、協力車" },
];

/* Q2～Q5 題目（與圖片一致） */
const likertBlocks = [
  { key: "q2", title: "第2題－請問您對鹿谷鄉公所『服務人員的服務態度』" },
  { key: "q3", title: "第3題－請問您對鹿谷鳳凰景區『景點內服務設施』" },
  { key: "q4", title: "第4題－請問您對鹿谷鳳凰景區『景點內空間設計』" },
  { key: "q5", title: "第5題－請問您對鹿谷鳳凰景區『引導指標或動線安排』" },
];

/* 5 點量表（非常滿意 → 沒有意見） */
const likertOptions = [
  { value: "5", label: "非常滿意" },
  { value: "4", label: "還算滿意" },
  { value: "3", label: "不太滿意" },
  { value: "2", label: "非常不滿意" },
  { value: "1", label: "沒有意見" },
];

/* 表單狀態 */
const form = ref({
  q1: [],
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  captcha: false,
});
const submitted = ref(false);

/* 送出 */
function handleSubmit() {
  submitted.value = true;
  const ok =
    form.value.q1.length > 0 &&
    form.value.q2 &&
    form.value.q3 &&
    form.value.q4 &&
    form.value.q5 &&
    form.value.captcha;

  if (!ok) return;
  alert("已送出（示意）\n" + JSON.stringify(form.value, null, 2));
}
</script>
