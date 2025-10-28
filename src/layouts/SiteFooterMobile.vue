<!-- src/layouts/SiteFooterMobile.vue -->
<template>
  <footer class="bg-[#1a1a1a] text-white">
    <div class="mx-auto py-10">
      <nav aria-label="頁尾選單" class="text-center">
        <ul
          class="footer-nav inline-flex flex-wrap items-center justify-center text-sm sm:text-base"
        >
          <li v-for="item in navItems" :key="item.label" class="px-1 sm:px-2">
            <a :href="item.href" class="hover:underline">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="mt-6 space-y-3 text-center">
        <p class="text-base sm:text-2xl font-semibold tracking-wide">
          服務專線 ／ {{ phone }}
        </p>
        <p class="text-base sm:text-2xl font-semibold tracking-wide" v-if="serviceTime">
          服務時間 ／ {{ serviceTime }}
        </p>
        <p class="text-base sm:text-lg opacity-90" v-if="fax">傳真 ／ {{ fax }}</p>
        <p class="text-base sm:text-lg opacity-90" v-if="address">
          地址 ／ {{ address }}
        </p>
      </div>

      <div
        class="mt-8 border-t border-white/20 pt-4 text-center text-white/80 text-sm leading-relaxed"
      >
        <p>© 南投縣鹿谷鄉公所 All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navItems = [
  { label: "隱私權保護政策", href: "#" },
  { label: "資通安全政策", href: "#" },
  { label: "資訊開放宣告", href: "#" },
  { label: "常見問題", href: "#" },
];

const phone = "049-2755720";
const serviceTime = "週一至週五 9:00–17:00"; // 你的實際營業/服務時間可在這裡改
const fax = "049-2754130";
const address = "55844南投縣鹿谷鄉鹿谷村中正路二段73號";
</script>

<style scoped>
/* 水平選單的「・」分隔符（除了第一個項目以外） */
.footer-nav li + li::before {
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0.75rem;
}
</style>
