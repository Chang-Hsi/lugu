<!-- src/components/about/LuguMap.vue -->
<template>
  <div class="relative w-full flex gap-4">
    <div
      ref="wrap"
      class="relative"
      :style="{ width: containerWidth + 'px', maxWidth: '100%' }"
      @mousemove="onMouseMove"
      @mouseleave="hideTooltip"
      @touchstart.passive="onTouchStart"
    >
      <div ref="svgHost" class="block w-full"></div>

      <!-- 藍色選取框（在 SVG 之上，避免被遮住） -->
      <div
        v-show="selection.show"
        class="selection-box absolute"
        :style="{
          left: selection.x + 'px',
          top: selection.y + 'px',
          width: selection.w + 'px',
          height: selection.h + 'px',
        }"
      ></div>

      <div
        v-show="tooltip.show"
        class="pointer-events-none absolute z-20 rounded-md px-2 py-1 text-[13px] bg-black/80 text-white whitespace-nowrap"
        :style="{
          left: tooltip.x + 'px',
          top: tooltip.y + 'px',
          transform: 'translate(8px, -50%)',
        }"
      >
        {{ tooltip.text }}
      </div>
    </div>

    <aside class="hidden md:flex flex-col gap-2 w-[320px] shrink-0">
      <div class="text-lg font-bold text-slate-800">區塊資訊</div>
      <div v-if="activeRegion" class="rounded-xl border border-slate-200 p-3 bg-white">
        <div class="text-slate-900 font-semibold">{{ activeRegion.label }}</div>
        <div class="mt-1 text-slate-600 text-sm leading-relaxed whitespace-pre-line">
          {{ activeRegion.desc || "（無說明）" }}
        </div>
        <div class="mt-3">
          <button
            class="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
            @click="emitSelect(activeRegion)"
          >
            前往介紹
          </button>
        </div>
      </div>
      <div v-else class="text-slate-500">滑過或點擊地圖上的區塊來查看內容</div>
    </aside>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from "vue";

/*
  這版僅做對應策略調整，不動樣式：
  - 嚴格依 props.regionMeta 的「陣列順序」對應每個偵測到的 shape。
  - 不再呼叫 <text> 的就近配對。
  - 保留原始 SVG 的顏色與線條：不寫任何 el.style.fill/stroke/strokeWidth/cursor。
  - [新增] selection overlay：關閉原生 outline，改用位於 SVG 之上的藍色框框。
*/

const props = defineProps({
  svgUrl: { type: String, required: true },
  containerWidth: { type: Number, default: 960 },
  highlightFill: { type: String, default: "rgba(34,197,94,0.35)" },
  highlightStroke: { type: String, default: "#16a34a" },
  normalStroke: { type: String, default: "#334155" },
  regionMeta: { type: Array, default: () => [] }, // 以「陣列順序」對應
});

const emit = defineEmits(["select"]);

const svgHost = ref(null);
const wrap = ref(null);
const svgEl = ref(null);

const tooltip = reactive({ show: false, text: "", x: 0, y: 0 });
const activeRegion = ref(null);

let lastTapTarget = null;
let lastTapTime = 0;

const regionsMap = new Map(); // Element => region
let regions = []; // region array

// [新增] 供藍色選取框使用的狀態（以 HTML 絕對定位，永遠在 SVG 之上）
const selection = reactive({
  show: false,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
});

// [新增] 依 SVG 元素的實際畫面位置更新選取框
function updateSelectionBoxFromEl(el) {
  if (!wrap.value || !el) return;
  const box = el.getBoundingClientRect();
  const host = wrap.value.getBoundingClientRect();
  const pad = 3; // 外擴一點點，比較像原生 outline
  selection.x = Math.round(box.left - host.left - pad);
  selection.y = Math.round(box.top - host.top - pad);
  selection.w = Math.round(box.width + pad * 2);
  selection.h = Math.round(box.height + pad * 2);
  selection.show = true;
}
// [新增] 隱藏選取框
function hideSelectionBox() {
  selection.show = false;
}

function onMouseMove(e) {
  const rect = wrap.value.getBoundingClientRect();
  tooltip.x = e.clientX - rect.left;
  tooltip.y = e.clientY - rect.top;
}
function hideTooltip() {
  tooltip.show = false;
}
function showTooltip(text) {
  tooltip.text = text;
  tooltip.show = true;
}

function labelOf(el, fallbackIndex) {
  const metaId = el.getAttribute("data-id");
  const idAttr = el.getAttribute("id");
  const nameAttr = el.getAttribute("data-name") || el.getAttribute("name");
  const aria = el.getAttribute("aria-label");
  const text = nameAttr || aria || idAttr || metaId || `區塊${fallbackIndex + 1}`;
  return text;
}

function buildRegion(el, idx) {
  const idAttr =
    el.getAttribute("id") || el.getAttribute("data-id") || `region-${idx + 1}`;
  const label = labelOf(el, idx);
  return { id: idAttr, label, desc: "", link: "", _el: el };
}

function hoverRegion(region) {
  activeRegion.value = region;
  showTooltip(region.label);
  region._el.classList.add("hotspot--active");
  updateSelectionBoxFromEl(region._el);
}
function leaveRegion(region) {
  if (!region) return;
  if (activeRegion.value && activeRegion.value.id !== region.id) return;
  region._el.classList.remove("hotspot--active");

  // [新增] 若該元素仍是 focus 狀態，就不要把框收掉
  if (document.activeElement === region._el) return;
  hideSelectionBox();
}
function selectRegion(region) {
  activeRegion.value = region;

  // [新增] 讓元素取得焦點以保留選取框（並避免捲動）
  region._el.focus({ preventScroll: true });
  updateSelectionBoxFromEl(region._el);

  emitSelect(region);
}
function emitSelect(region) {
  emit("select", {
    id: region.id,
    label: region.label,
    desc: region.desc,
    link: region.link,
    img: region.img || "",
  });
}
function onKeydown(e, region) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    selectRegion(region);
  }
}
function onTouchStart(e) {
  const now = Date.now();
  const target = e.target.closest(".hotspot");
  if (!target) return;
  const region = regionsMap.get(target);
  if (!region) return;
  if (lastTapTarget === target && now - lastTapTime < 800) {
    selectRegion(region);
    lastTapTarget = null;
  } else {
    hoverRegion(region);
    lastTapTarget = target;
    lastTapTime = now;
  }
}

/* 取得元素中心座標（用 getBBox，已包含 transform） */
function centerOf(el) {
  const b = el.getBBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}

/* 只把「有填色」的形狀視為熱區；排除線段/裝飾（fill=none/transparent） */
function pickFilledShapes() {
  const all = Array.from(svgEl.value.querySelectorAll("polygon, path, rect, circle"));
  const shapes = all.filter((el) => {
    const attrFill = el.getAttribute("fill");
    const styleFill =
      typeof window !== "undefined" ? window.getComputedStyle(el).fill : null;

    const fillValue = (attrFill || styleFill || "").toLowerCase();
    if (!fillValue) return false;
    if (fillValue === "none" || fillValue === "transparent") return false;
    return true;
  });
  return shapes;
}

/* 嚴格依 meta 的「陣列順序」覆寫每個區塊的 id/label/desc/link */
function applyMetaOrder() {
  if (!regions.length || !props.regionMeta.length) return;

  if (props.regionMeta.length !== regions.length) {
    console.warn(
      `[LuguMap] regionMeta length (${props.regionMeta.length}) != shapes (${regions.length}). ` +
        `Will assign by index up to min length.`
    );
  }
  const n = Math.min(props.regionMeta.length, regions.length);
  for (let i = 0; i < n; i++) {
    const m = props.regionMeta[i];
    const r = regions[i];
    r.id = m.id ?? r.id;
    r.label = m.label ?? r.label;
    r.desc = m.desc ?? r.desc;
    r.link = m.link ?? r.link;
    r.img = m.img ?? r.img;
    r._el.setAttribute("aria-label", r.label || "");
  }
}

async function loadSvg() {
  const res = await fetch(props.svgUrl);
  const text = await res.text();
  svgHost.value.innerHTML = text;
  await nextTick();

  svgEl.value =
    svgHost.value.querySelector("svg") || svgHost.value.querySelector("svg, SVG");
  if (!svgEl.value) return;

  svgEl.value.setAttribute("width", "100%");
  svgEl.value.setAttribute("height", "auto");
  svgEl.value.style.display = "block";

  regionsMap.clear();
  regions = [];

  const shapes = pickFilledShapes();

  let index = 0;
  shapes.forEach((el) => {
    if (el.getAttribute("data-hotspot") === "false") return;

    el.classList.add("hotspot");
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");

    const region = buildRegion(el, index++);
    el.setAttribute("aria-label", region.label);

    const onEnter = () => hoverRegion(region);
    const onLeave = () => {
      leaveRegion(region);
      hideTooltip();
    };
    const onClick = () => selectRegion(region);
    const onKey = (ev) => onKeydown(ev, region);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", onKey);

    // [新增] 鍵盤/滑鼠聚焦時也更新選取框；失焦時隱藏
    el.addEventListener("focus", () => updateSelectionBoxFromEl(el));
    el.addEventListener("blur", hideSelectionBox);

    regionsMap.set(el, region);
    regions.push(region);
  });

  applyMetaOrder();
}

onMounted(() => {
  loadSvg();

  // [新增] 視窗尺寸變動時，若仍顯示選取框，動態重算位置大小
  const onResize = () => {
    const el = document.activeElement;
    if (selection.show && el && regionsMap.has(el)) {
      updateSelectionBoxFromEl(el);
    }
  };
  window.addEventListener("resize", onResize);
});
watch(() => props.svgUrl, loadSvg);
</script>

<style scoped>
/* hover/active 的高亮（你原本就有） */
.hotspot.hotspot--active {
  fill: v-bind("highlightFill");
  stroke: v-bind("highlightStroke");
  stroke-width: 2;
  filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.35));
}

/* 重要：用 :deep 讓規則套到 innerHTML 裡的 SVG 節點，移除瀏覽器原生藍色 focus 框 */
:deep(.hotspot),
:deep(.hotspot:focus),
:deep(.hotspot:focus-visible) {
  outline: none !important; /* 取消預設 focus ring */
}

/* 行動裝置點擊的淡藍高亮也一起關掉（iOS/Android） */
:deep(.hotspot) {
  -webkit-tap-highlight-color: transparent;
}

/* 你的自訂藍色選取框（overlay），永遠在 SVG 之上 */
.selection-box {
  z-index: 30;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  pointer-events: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}
</style>
