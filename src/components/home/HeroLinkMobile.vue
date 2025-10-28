<template>
  <section class="w-full">
    <div class="mx-auto max-w-7xl px-4">
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div class="flex items-center justify-center gap-2 p-3">
          <button
            type="button"
            class="flex-1 inline-flex items-center justify-center h-10 rounded-lg border transition px-3 text-sm font-semibold"
            :class="
              active === 'video'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            "
            @click="active = 'video'"
          >
            <i class="pi pi-youtube mr-2 [--p-icon-size:1rem]"></i> 影片
          </button>
          <button
            type="button"
            class="flex-1 inline-flex items-center justify-center h-10 rounded-lg border transition px-3 text-sm font-semibold"
            :class="
              active === 'page'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            "
            @click="active = 'page'"
          >
            <i class="pi pi-facebook mr-2 [--p-icon-size:1rem]"></i> FB
          </button>
        </div>

        <div class="p-3">
          <div v-show="active === 'video'" class="w-full">
            <div class="relative w-full rounded-xl overflow-hidden shadow-sm video-box">
              <iframe
                class="absolute inset-0 w-full h-full"
                :src="VIDEO_URL + '?rel=0&modestbranding=1&playsinline=1'"
                title="YouTube Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div v-show="active === 'page'" class="w-full">
            <iframe
              class="w-full rounded-xl shadow-sm"
              :src="pageIframeSrc"
              style="height: 460px; border: 0; overflow: hidden"
              scrolling="no"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
              title="Facebook Page"
            ></iframe>
          </div>

          <div v-show="active === 'photo'" class="w-full">
            <iframe
              class="w-full rounded-xl shadow-sm"
              :src="postIframeSrc"
              style="height: 560px; border: 0; overflow: hidden"
              scrolling="no"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
              title="Facebook Photo"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const PAGE_URL = "https://www.facebook.com/LuguOffice";
const PHOTO_URL =
  "https://www.facebook.com/photo.php?fbid=1211190037705501&set=a.343066877851159&type=3";
const VIDEO_URL = "https://www.youtube-nocookie.com/embed/HH0LDcch21Y";

const active = ref("video");

const pageIframeSrc = computed(() => {
  const href = encodeURIComponent(PAGE_URL);
  return `https://www.facebook.com/plugins/page.php?href=${href}&tabs=timeline&small_header=true&hide_cover=false&show_facepile=true&adapt_container_width=true&width=360&height=460`;
});

const postIframeSrc = computed(() => {
  const href = encodeURIComponent(PHOTO_URL);
  return `https://www.facebook.com/plugins/post.php?href=${href}&show_text=true&adapt_container_width=true&width=360`;
});
</script>

<style scoped>
.video-box {
  padding-top: 56.25%;
}
</style>
