<template>
  <section class="w-full">
    <div class="mx-auto max-w-7xl px-4">
      <div class="flex flex-col gap-6">
        <article
          v-for="t in tiles"
          :key="t.key"
          class="relative w-full rounded-2xl overflow-hidden"
        >
          <div
            class="w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] bg-center bg-cover flex items-center justify-center"
            :style="{ backgroundImage: `url(${t.backgroudImage})` }"
          >
            <div class="absolute inset-0 bg-black/40"></div>
            <div
              class="relative z-10 flex flex-col items-center justify-center gap-2 text-white"
            >
              <i
                :class="['pi', t.icon]"
                class="[--p-icon-size:2rem] sm:[--p-icon-size:2.25rem] md:[--p-icon-size:2.5rem]"
              ></i>
              <div class="text-sm font-semibold tracking-widest opacity-90 uppercase">
                {{ t.title }}
              </div>
              <div class="text-2xl md:text-3xl font-extrabold drop-shadow">
                {{ t.subtit }}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const tiles = [
  {
    key: "traffic",
    title: "TRAFFIC",
    subtit: "交通資訊",
    icon: "pi-car",
    backgroudImage:
      "https://cdn-smiletaiwan.cw.com.tw/article/202506/article-6858e40c86e96.jpg",
  },
  {
    key: "spots",
    title: "SPOTS",
    subtit: "景點介紹",
    icon: "pi-map-marker",
    backgroudImage: "https://itaiwan.moe.gov.tw/upfd/2019race/map/RC-190726-071131.jpg",
  },
  {
    key: "welfare",
    title: "WELFARE",
    subtit: "社會福利",
    icon: "pi-heart",
    backgroudImage:
      "https://newsasiascom.files.wordpress.com/2021/12/def32325-2eab-4bca-b616-59917113d0e4.jpeg?w=1024",
  },
  {
    key: "extensions",
    title: "EXTENSIONS",
    subtit: "分機查詢",
    icon: "pi-phone",
    backgroudImage: "https://img.ltn.com.tw/Upload/news/600/2019/11/20/2983570_2_1.jpg",
  },
  {
    key: "lamp",
    title: "LAMP REPAIR",
    subtit: "路燈報修",
    icon: "pi-bolt",
    backgroudImage:
      "https://mook-aws.hmgcdn.com/public/article/a2/24981/A24981_1603680626_2.jpg",
  },
  {
    key: "road",
    title: "ROAD REPAIR",
    subtit: "道路報修",
    icon: "pi-directions",
    backgroudImage: "https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_9655_3.jpg",
  },
];
</script>
