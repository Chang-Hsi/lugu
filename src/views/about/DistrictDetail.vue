<!-- src/components/VillageArticle.vue -->
<template>
  <div class="w-full">
    <Card class="border border-slate-200 rounded-2xl overflow-hidden">
      <template #title>
        <div class="flex items-center justify-between mb-4">
          <Button
            icon="pi pi-arrow-left"
            label="返回"
            severity="secondary"
            @click="$emit('close')"
          />
        </div>
        <div class="text-2xl font-extrabold text-slate-900">內湖村資訊</div>
      </template>

      <template #content>
        <div
          class="leading-relaxed text-[15px] md:text-base text-slate-800 space-y-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:mt-2"
          v-html="htmlContent"
        ></div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";

/* 新增：對外事件，父層 Geography 會接收 */
defineEmits(["close"]);
const props = defineProps({ region: { type: Object, default: null } });

const rawText = `一、村里介紹

內湖村位於南投縣鹿谷鄉，全村依傍著鳳凰山麓，村莊東面與鳳凰村為鄰，東南方則以鳳凰山與信義鄉交界，西面以北勢溪為界和竹林、和雅兩村相望，南與竹山鎮交壤，北與廣興村接連。是一個美麗的山村，著名的「溪頭森林遊樂區」便位於本村內。內湖村呈狹長型地形，長約七公里，為丘陵地形，是北勢溪源頭。全村面積24.1927平方公里，全村有502戶，公民人口總數為1156人。由竹山通往溪頭的延溪公路（投1 51線）為本村的交通動脈。村落人口聚集主要分為二大聚落，一為【內湖區】：柯樹坪、田寮、內湖庄、十八股、有水坑，一為【溪頭區】：彎坑、溪坪、下溪頭、上溪頭、觀音樹湖等十個聚落，內湖區過去以農業為主，溪頭區則以觀光事業為主。全村約有百分之九十五的土地為「台大實驗林管理處」代管的國有土地。內湖村具有台灣中海拔山區的自然資源，海拔高度由500公尺（北勢溪）至1839公尺。在如此狹小的區域內海拔落差達1300公尺，其自然生態之多樣性，非常豐富，具有發展生態村落的潛力。

二、村里旅遊導覽

入口意象：內湖村入口意象，以地方特產孟宗竹為主要建材，象徵本地特色，搭配本會極力推展螢火蟲護育主軸而構成的歡迎招牌。當您看到這個招牌時就表示您已進入內湖村了。

三、村里特產小吃

竹筒飯、山芹菜（該特產為高能冷蔬菜）

四、公共設施

內湖活動中心 地址：內湖村興產路71-5號

五、村長簡介

陳村長平日為人熱心，樂善好施，獲得村民之肯定，鼓勵參選村長，在村民熱烈支持下，終於高票當選內湖村村長，為感謝村民之愛護，將努力爭取上級補助，推動村里建設，並以專職村長服務村民。

村長姓名：陳竹能
性別：男
生日：51.07.16
學歷：國小畢
經歷：第20屆內湖村村長

六、村幹事簡介

村幹事姓名：陳泰穎
性別：男
生日：65.05.06

七、村里民服務處聯絡方式

地址：內湖村興產路2-7號
電話：0492612658、0910-464457

八、村里概況

總人口數：1156
土地面積：24.1927平方公里
戶數：502
鄰數：12

歷史沿革：內湖村有三多三好，森林多、竹林多、石頭多、氣候好、景色好、人情好。景觀特色為孟宗竹林相、杉木林相、巨石林相、梯田式茶園。竹林與森林的發展是為本村發展之最大潛能。近十多年來全村產業逐漸朝向觀光產業發展。村內餐廳、旅社、民宿、特產行、茶行林立，農業產品以茶葉及冬筍為大宗。

九、本村生態協會研究成果

溪頭風景區的知名度雖高，但溪頭位於內湖村之事實則鮮為人知。內湖村具有台灣中海拔山區的自然資源，其中最負盛名的自然以孟宗竹林、杉木林相為最；然而除此之外，事實上仍有許多具備特色的地方資產。種植作物以竹、茶、山地野菜為大宗。`;

// 將 textarea 生字串轉成可閱讀 HTML
const htmlContent = computed(() => toHtml(rawText));

function toHtml(input) {
  const escaped = escapeHtml(input || "");
  const lines = escaped.replace(/\r\n/g, "\n").split("\n");

  const h2Pattern = /^([一二三四五六七八九十百千]+)、\s*(.+)$/;
  const kvPattern = /^(.{1,20}?)：\s*(.+)$/;

  const chunks = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      continue;
    }

    // 章節標題（例：一、村里介紹）
    const h2m = line.match(h2Pattern);
    if (h2m) {
      chunks.push(`<h2>${h2m[1]}、${h2m[2]}</h2>`);
      continue;
    }

    // 資訊行（例：村長姓名：陳竹能）
    const kvm = line.match(kvPattern);
    if (kvm) {
      chunks.push(`<p><strong class="">${kvm[1]}：</strong>${kvm[2]}</p>`);
      continue;
    }

    // 一般段落
    chunks.push(`<p>${line}</p>`);
  }

  return chunks.join("\n");
}

// 簡易 escape，避免 textarea 內含 < > & 造成 HTML 注入
function escapeHtml(str) {
  return str.replaceAll(/&/g, "&amp;").replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;");
}
</script>

<style scoped>
/* 額外小強化：連續的段落留點空隙；已用 Tailwind 的 space-y-3，但保底一下 */
</style>
