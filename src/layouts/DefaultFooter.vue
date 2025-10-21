<!-- src/layouts/DefaultFooter.vue -->
<template>
  <footer
    :id="footerId"
    :accesskey="accessKey"
    role="contentinfo"
    class="bg-slate-800 text-slate-100"
  >
    <div class="mx-auto max-w-7xl px-4 py-12">
      <!-- 4 欄（RWD：直落；md 起 2 欄；lg 起 4 欄） -->
      <div class="flex flex-wrap gap-8">
        <!-- 聯絡資訊 -->
        <section
          class="basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(25%-24px)]"
          aria-labelledby="ft-contact"
        >
          <h2 id="ft-contact" class="text-lg font-semibold">聯絡資訊</h2>
          <address class="not-italic mt-4 text-slate-300">
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <svg
                  class="h-5 w-5 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
                  />
                </svg>
                <span>{{ address }}</span>
              </li>
              <li class="flex items-center gap-3">
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.4 22 2 13.6 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z"
                  />
                </svg>
                <a :href="`tel:${phoneHref}`" class="hover:text-white focus:text-white">{{
                  phone
                }}</a>
              </li>
              <li class="flex items-center gap-3">
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M19 7H5V4h14v3Zm0 2H5v11h14V9Zm2-7H3a1 1 0 0 0-1 1v19a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
                  />
                </svg>
                <span>{{ fax }}</span>
              </li>
              <li class="flex items-center gap-3 break-all">
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M20 4H4a2 2 0 0 0-2 2v.35l10 6.25L22 6.35V6a2 2 0 0 0-2-2Zm0 4.24-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.24Z"
                  />
                </svg>
                <a :href="`mailto:${email}`" class="hover:text-white focus:text-white">{{
                  email
                }}</a>
              </li>
            </ul>
          </address>
        </section>

        <!-- 服務時間 -->
        <section
          class="basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(25%-24px)]"
          aria-labelledby="ft-hours"
        >
          <h2 id="ft-hours" class="text-lg font-semibold">服務時間</h2>
          <div class="mt-4 space-y-1 text-slate-300">
            <div class="flex items-center gap-3">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1Zm1 11h5v2h-7V6h2v6Z"
                />
              </svg>
              <span>週一至週五</span>
            </div>
            <div class="ml-7">上午 08:00 - 12:00</div>
            <div class="ml-7">下午 13:30 - 17:30</div>
            <div class="ml-7 text-yellow-300">※ 中午不休息服務</div>
            <div class="ml-7">※ 國定假日休息</div>
          </div>
        </section>

        <!-- 政策連結 -->
        <nav
          class="basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(25%-24px)]"
          aria-labelledby="ft-policy"
        >
          <h2 id="ft-policy" class="text-lg font-semibold">政策連結</h2>
          <ul class="mt-4 space-y-2 text-slate-300">
            <li>
              <a href="#" class="hover:text-white focus:text-white">隱私權保護政策</a>
            </li>
            <li>
              <a href="#" class="hover:text-white focus:text-white">資訊安全政策</a>
            </li>
            <li>
              <a href="#" class="hover:text-white focus:text-white">資料開放宣告</a>
            </li>
            <li>
              <a href="#" class="hover:text-white focus:text-white"
                >政府網站資料開放宣告</a
              >
            </li>
            <li>
              <RouterLink
                class="hover:text-white focus:text-white"
                :to="{ name: 'accessibility' }"
                >無障礙說明</RouterLink
              >
            </li>
            <li>
              <a href="#" class="hover:text-white focus:text-white">網站安全政策</a>
            </li>
          </ul>
        </nav>

        <!-- 便民服務 -->
        <nav
          class="basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(25%-24px)]"
          aria-labelledby="ft-service"
        >
          <h2 id="ft-service" class="text-lg font-semibold">便民服務</h2>
          <ul class="mt-4 space-y-2 text-slate-300">
            <li><a href="#" class="hover:text-white focus:text-white">常見問題</a></li>
            <li><a href="#" class="hover:text-white focus:text-white">聯絡我們</a></li>
            <li>
              <RouterLink
                class="hover:text-white focus:text-white"
                :to="{ name: 'sitemap' }"
                >網站導覽</RouterLink
              >
            </li>
            <li>
              <a href="#" lang="en" class="hover:text-white focus:text-white">English</a>
            </li>
            <li><a href="#" class="hover:text-white focus:text-white">意見信箱</a></li>
            <li>
              <a href="#" class="hover:text-white focus:text-white">申辦進度查詢</a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- 分隔線 -->
      <div class="mt-8 border-t border-slate-700"></div>

      <!-- 夥伴/標章 與 建議瀏覽器 -->
      <div class="mt-6 flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=300"
            alt=""
            class="h-16 w-28 rounded object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=300"
            alt=""
            class="h-16 w-28 rounded object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=300"
            alt=""
            class="hidden md:block h-16 w-28 rounded object-cover"
          />
        </div>
        <div class="text-right text-slate-400 text-sm leading-6">
          <div>建議瀏覽器：Chrome、Firefox、Safari、Edge</div>
          <div>建議解析度：1024×768 以上</div>
        </div>
      </div>

      <div class="mt-6 border-t border-slate-700"></div>

      <!-- 版權列 -->
      <div
        class="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between text-slate-400 text-sm gap-3"
      >
        <div class="flex-1">
          © {{ year }} 南投縣鹿谷鄉公所 版權所有｜最後更新日期：{{ lastUpdated }}
        </div>
        <div class="flex items-center gap-3">
          <RouterLink class="hover:text-white focus:text-white" :to="{ name: 'sitemap' }"
            >網站地圖</RouterLink
          >
          <span class="opacity-50" aria-hidden="true">|</span>
          <a
            href="https://www.gov.tw/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 hover:text-white focus:text-white"
          >
            我的e政府
            <svg
              class="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3z" />
              <path d="M5 5h5V3H3v7h2V5zm0 14v-5H3v7h7v-2H5zm14-5h2v7h-7v-2h5v-5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  footerId: { type: String, default: "footer" },
  accessKey: { type: String, default: "S" },
  address: {
    type: String,
    default: "55841 南投縣鹿谷鄉鹿谷村中正路一段231號",
  },
  phone: { type: String, default: "049-2752001" },
  fax: { type: String, default: "049-2753806" },
  email: { type: String, default: "lugu@nantou.gov.tw" },
  lastUpdated: { type: String, default: "2024/03/15" },
});

const year = new Date().getFullYear();

// 將電話轉為 tel: 連結可用格式（移除空白與破折號）
const phoneHref = computed(() => props.phone.replace(/[^\d+]/g, ""));
</script>
