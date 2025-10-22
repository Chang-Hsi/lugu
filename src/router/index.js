// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 頂部靜態 imports（依你的檔案路徑）
import Home from '@/views/home/Home.vue'

// News
import NewsIndex from '@/views/news/Index.vue'
import NewsLatest from '@/views/news/Latest.vue'
import NewsAnnouncements from '@/views/news/Announcements.vue'
import NewsEvents from '@/views/news/Events.vue'
import NewsPress from '@/views/news/Press.vue'
import NewsTenders from '@/views/news/Tenders.vue'
import NewsJobs from '@/views/news/Jobs.vue'


// About
import AboutIndex from '@/views/about/Index.vue'
import AboutOverview from '@/views/about/Overview.vue'
import AboutHistory from '@/views/about/History.vue'

// About → Districts (13 村)
import AboutDistrictsIndex from '@/views/about/districts/Index.vue'
import VillageNeihu from '@/views/about/districts/Neihu.vue'
import VillageHeya from '@/views/about/districts/Heya.vue'

// Policy
import PolicyIndex from '@/views/policy/Index.vue'
import PolicyOpenData from '@/views/policy/OpenData.vue'
import PolicyBudget from '@/views/policy/Budget.vue'
import PolicySustainability from '@/views/policy/Sustainability.vue'

// Services
import ServicesIndex from '@/views/services/Index.vue'
import ServicesWelfare from '@/views/services/Welfare.vue'
import ServicesDisaster from '@/views/services/Disaster.vue'
import ServicesPlaceholder from '@/views/services/Placeholder.vue'
import WelfareDetail from '@/views/services/WelfareDetail.vue'

// Council
import CouncilIndex from '@/views/council/Index.vue'
import CouncilChair from '@/views/council/Chair.vue'
import CouncilOrganization from '@/views/council/Organization.vue'

// Online
import OnlineIndex from '@/views/online/Index.vue'
import OnlineMenu from '@/views/online/Menu.vue'
import OnlineSurveys from '@/views/online/Surveys.vue'
import SurveyDetail from '@/views/online/SurveyDetail.vue'
import OnlineVotes from '@/views/online/Votes.vue'

// Common & System
import SiteMap from '@/views/common/SiteMap.vue'
import Search from '@/views/common/Search.vue'
import Accessibility from '@/views/common/Accessibility.vue'
import NotFound from '@/views/system/NotFound.vue'

const SITE_NAME = '南投縣鹿谷鄉公所全球資訊網'

export const routes = [
  // 首頁
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: '首頁', breadcrumb: ['首頁'], icon: 'pi pi-home', menu: false }
  },

  // 熱門消息（僅保留：最新消息、政令宣導）
  {
    path: '/news',
    name: 'news',
    component: NewsIndex,
    redirect: { name: 'news-latest' },
    meta: { title: '熱門消息', breadcrumb: ['首頁', '熱門消息'], icon: 'pi pi-megaphone', menu: true, order: 1 },
    children: [
      { path: 'latest', name: 'news-latest', component: NewsLatest, meta: { title: '最新消息', breadcrumb: ['首頁', '熱門消息', '最新消息'] } },
      { path: 'announcements', name: 'news-announcements', component: NewsAnnouncements, meta: { title: '政令宣導', breadcrumb: ['首頁', '熱門消息', '政令宣導'] } },
      { path: 'events', name: 'news-events', component: NewsEvents, meta: { title: '活動專區', breadcrumb: ['首頁', '熱門消息', '活動專區'] } },
      { path: 'press', name: 'news-press', component: NewsPress, meta: { title: '新聞稿', breadcrumb: ['首頁', '熱門消息', '新聞稿'] } },
      { path: 'tenders', name: 'news-tenders', component: NewsTenders, meta: { title: '招標公告', breadcrumb: ['首頁', '熱門消息', '招標公告'] } },
      { path: 'jobs', name: 'news-jobs', component: NewsJobs, meta: { title: '徵才公告', breadcrumb: ['首頁', '熱門消息', '徵才公告'] } },

    ]
  },

  // 關於本鄉（僅保留：簡介、歷史、行政區總覽＋2 村）
  {
    path: '/about',
    name: 'about',
    component: AboutIndex,
    redirect: { name: 'about-overview' },
    meta: { title: '關於本鄉', breadcrumb: ['首頁', '關於本鄉'], icon: 'pi pi-info-circle', menu: true, order: 2 },
    children: [
      { path: 'overview', name: 'about-overview', component: AboutOverview, meta: { title: '鹿谷簡介', breadcrumb: ['首頁', '關於本鄉', '鹿谷簡介'] } },
      { path: 'history', name: 'about-history', component: AboutHistory, meta: { title: '歷史沿革', breadcrumb: ['首頁', '關於本鄉', '歷史沿革'] } },
      { path: 'geography',    name: 'about-geography',    component: AboutOverview, meta: { title: '自然環境' } },
      { path: 'specialty',    name: 'about-specialty',    component: AboutOverview, meta: { title: '特產介紹' } },
      { path: 'traffic',      name: 'about-traffic',      component: AboutOverview, meta: { title: '交通運輸' } },
      { path: 'departments',  name: 'about-departments',  component: AboutOverview, meta: { title: '各課室業務' } },
      { path: 'district-map', name: 'about-district-map', component: AboutOverview, meta: { title: '行政區域圖' } },
      { path: 'chronicle',    name: 'about-chronicle',    component: AboutOverview, meta: { title: '鄉志' } },

      // 行政區
      { path: 'districts', name: 'about-districts', component: AboutDistrictsIndex, meta: { title: '行政區', breadcrumb: ['首頁', '關於本鄉', '行政區'] } },
      { path: 'districts/neihu', name: 'village-neihu', component: VillageNeihu, meta: { title: '內湖村', breadcrumb: ['首頁', '關於本鄉', '行政區', '內湖村'] } },
      { path: 'districts/heya', name: 'village-heya', component: VillageHeya, meta: { title: '和雅村', breadcrumb: ['首頁', '關於本鄉', '行政區', '和雅村'] } },
    ]
  },

  // 法規政策（僅保留：資訊公開、年度預算）
  {
    path: '/policy',
    name: 'policy',
    component: PolicyIndex,
    redirect: { name: 'policy-open' },
    meta: { title: '法規政策', breadcrumb: ['首頁', '法規政策'], icon: 'pi pi-file', menu: true, order: 3 },
    children: [
      { path: 'open', name: 'policy-open', component: PolicyOpenData, meta: { title: '資訊公開', breadcrumb: ['首頁', '法規政策', '資訊公開'] } },
      { path: 'budget', name: 'policy-budget', component: PolicyBudget, meta: { title: '年度預算', breadcrumb: ['首頁', '法規政策', '年度預算'] } },
      { path: 'sustainability', name: 'policy-sustainability', component: PolicySustainability, meta: { title: '永續提升', breadcrumb: ['首頁', '法規政策', '永續提升'] } },
      { path: 'policy-related', name: 'policy-related', component: PolicyOpenData, meta: { title: '政策相關', breadcrumb: ['首頁', '法規政策', '政策相關'] } },
      // 新增：側欄八個項目（皆暫用同一畫面，之後再替換）
      { path: 'annual-expense', name: 'policy-annual-expense', component: PolicyOpenData, meta: { title: '年度經費', breadcrumb: ['首頁', '法規政策', '年度經費'] } },
      { path: 'open-data', name: 'policy-open-data', component: PolicyOpenData, meta: { title: '資訊公開', breadcrumb: ['首頁', '法規政策', '資訊公開'] } },
      { path: 'integrity', name: 'policy-integrity', component: PolicyOpenData, meta: { title: '廉政園地', breadcrumb: ['首頁', '法規政策', '廉政園地'] } },
      { path: 'construction', name: 'policy-construction', component: PolicyOpenData, meta: { title: '施工工程', breadcrumb: ['首頁', '法規政策', '施工工程'] } },
      { path: 'debt', name: 'policy-debt', component: PolicyOpenData, meta: { title: '最新債務訊息', breadcrumb: ['首頁', '法規政策', '最新債務訊息'] } },
      { path: 'post-disaster', name: 'policy-post-disaster', component: PolicyOpenData, meta: { title: '災後復建審議', breadcrumb: ['首頁', '法規政策', '災後復建審議'] } },
      { path: 'pedestrian-safety', name: 'policy-pedestrian-safety', component: PolicyOpenData, meta: { title: '永續提升人行安全計畫', breadcrumb: ['首頁', '法規政策', '永續提升人行安全計畫'] } },
    ]
  },

  // 便民服務（僅保留：社會福利、防災專區）
  {
    path: '/services',
    name: 'services',
    component: ServicesIndex,
    redirect: { name: 'services-welfare' },
    meta: { title: '便民服務', breadcrumb: ['首頁', '便民服務'], icon: 'pi pi-th-large', menu: true, order: 4 },
    children: [
      { path: 'welfare', name: 'services-welfare', component: ServicesWelfare, meta: { title: '社會福利', breadcrumb: ['首頁', '便民服務', '社會福利'] } },
      // 社會福利詳文（九宮格點進來）
      { 
        path: 'welfare/:slug',
        name: 'services-welfare-detail',
        component: WelfareDetail,
        meta: {
          title: '社會福利',
          breadcrumb: ['首頁', '便民服務', '社會福利'],
          hidden: true // <— 新增：不要出現在頂層選單
        }
      },
      { path: 'disaster', name: 'services-disaster', component: ServicesDisaster, 
        meta: { title: '防災專區', breadcrumb: ['首頁', '便民服務', '防災專區'] } },
      // 以下暫定頁都先用共用 Placeholder.vue
      { path: 'military',   name: 'services-military',   component: ServicesPlaceholder, meta: { title: '兵役資訊' } },
      { path: 'kindergarten', name: 'services-kindergarten', component: ServicesPlaceholder, meta: { title: '鄉立幼兒園' } },
      { path: 'grace-hall', name: 'services-grace-hall', component: ServicesPlaceholder, meta: { title: '鹿谷鄉路思堂' } },
      { path: 'links',      name: 'services-links',      component: ServicesPlaceholder, meta: { title: '相關連結' } },
      { path: 'faq',        name: 'services-faq',        component: ServicesPlaceholder, meta: { title: '常見問題' } },
      { path: 'library',    name: 'services-library',    component: ServicesPlaceholder, meta: { title: '鹿谷鄉立圖書館' } },
      { path: 'conflict',   name: 'services-conflict',   component: ServicesPlaceholder, meta: { title: '公職人員利益衝突迴避法身分關係公開專區' } },
      { path: 'drought',    name: 'services-drought',    component: ServicesPlaceholder, meta: { title: '抗旱專區' } },
      ]
  },

  // 代表會（僅保留：主席介紹、組織介紹）
  {
    path: '/council',
    name: 'council',
    component: CouncilIndex,
    redirect: { name: 'council-chair' },
    meta: { title: '代表會', breadcrumb: ['首頁', '代表會'], icon: 'pi pi-briefcase', menu: true, order: 5 },
    children: [
      // 主席介紹：保留原本獨立頁
      { path: 'chair', name: 'council-chair', component: CouncilChair,
        meta: { title: '主席介紹', breadcrumb: ['首頁', '代表會', '主席介紹'] } },

      // 根據圖片新增的 4 個目錄（皆暫用同一畫面：CouncilOrganization.vue）
      { path: 'assembly', name: 'council-assembly', component: CouncilOrganization,
        meta: { title: '鄉民代表會', breadcrumb: ['首頁', '代表會', '鄉民代表會'] } },
      { path: 'overseas-reports', name: 'council-overseas-reports', component: CouncilOrganization,
        meta: { title: '出國考察報告', breadcrumb: ['首頁', '代表會', '出國考察報告'] } },
      { path: 'activities', name: 'council-activities', component: CouncilOrganization,
        meta: { title: '代表會活動', breadcrumb: ['首頁', '代表會', '代表會活動'] } },
      { path: 'meetings', name: 'council-meetings', component: CouncilOrganization,
        meta: { title: '會議資訊', breadcrumb: ['首頁', '代表會', '會議資訊'] } },

      // 若仍需要「組織介紹」可保留；之後你也可把它換到真的組織頁
      { path: 'organization', name: 'council-organization', component: CouncilOrganization,
        meta: { title: '組織介紹', breadcrumb: ['首頁', '代表會', '組織介紹'] } },
    ]
  },

  // 線上服務交流（僅保留：問卷、投票）
  {
    path: '/online',
    name: 'online',
    component: OnlineIndex,                // 你既有的外層 Layout（可保留）
    redirect: { name: 'online-menu' },     // 進入就看到外頁目錄
    meta: { title: '線上服務交流', breadcrumb: ['首頁', '線上服務交流'], icon: 'pi pi-send', menu: true, order: 6 },
    children: [
      { path: '', name: 'online-menu', component: OnlineMenu, meta: { title: '線上服務交流', breadcrumb: ['首頁', '線上服務交流'] }},

      // 子頁（暫都可用同一支內容骨架，之後替換）
      { path: 'surveys',           name: 'online-surveys',        component: OnlineSurveys, meta: { title: '問卷調查',     breadcrumb: ['首頁', '線上服務交流', '問卷調查'] } },
      { path: 'votes',             name: 'online-votes',          component: OnlineSurveys, meta: { title: '線上投票',     breadcrumb: ['首頁', '線上服務交流', '線上投票'] } },
      { path: 'forms',             name: 'online-forms',          component: OnlineSurveys, meta: { title: '表單下載',     breadcrumb: ['首頁', '線上服務交流', '表單下載'] } },
      { path: 'signup',            name: 'online-signup',         component: OnlineSurveys, meta: { title: '活動報名',     breadcrumb: ['首頁', '線上服務交流', '活動報名'] } },
      { path: 'streetlight',       name: 'online-streetlight',    component: OnlineSurveys, meta: { title: '路燈報修',     breadcrumb: ['首頁', '線上服務交流', '路燈報修'] } },
      { path: 'road',              name: 'online-road',           component: OnlineSurveys, meta: { title: '道路報修',     breadcrumb: ['首頁', '線上服務交流', '道路報修'] } },
      { path: 'mirror',            name: 'online-mirror',         component: OnlineSurveys, meta: { title: '反射鏡報修',   breadcrumb: ['首頁', '線上服務交流', '反射鏡報修'] } },
      { path: 'disaster',          name: 'online-disaster',       component: OnlineSurveys, meta: { title: '災害通報',     breadcrumb: ['首頁', '線上服務交流', '災害通報'] } },
      { path: 'disaster-query',    name: 'online-disaster-query', component: OnlineSurveys, meta: { title: '災害通報查詢', breadcrumb: ['首頁', '線上服務交流', '災害通報查詢'] } },
    ]
  },

  // --- 問卷填寫（放在最外層；新分頁開啟使用） ---
  {
    path: '/survey/:slug',
    name: 'survey-detail',
    component: SurveyDetail,
    meta: {
      title: '問卷填寫',
      breadcrumb: ['首頁', '線上服務交流', '問卷填寫'],
      hidden: true // 不進頂層選單
    }
  },

  // 共用：網站導覽 / 搜尋 / 無障礙
  { path: '/sitemap', name: 'sitemap', component: SiteMap, meta: { title: '網站導覽', breadcrumb: ['首頁', '網站導覽'], icon: 'pi pi-sitemap', menu: false } },
  { path: '/search', name: 'search', component: Search, meta: { title: '站內搜尋', breadcrumb: ['首頁', '站內搜尋'], icon: 'pi pi-search', menu: false } },
  { path: '/accessibility', name: 'accessibility', component: Accessibility, meta: { title: '無障礙宣告', breadcrumb: ['首頁', '無障礙宣告'], icon: 'pi pi-unlock', menu: false } },

  // 404
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { title: '找不到頁面', breadcrumb: ['首頁', '404'] } }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      try {
        const el = decodeURIComponent(to.hash)
        return { el, top: 80, behavior: 'smooth' }
      } catch (e) { }
    }
    return { top: 0 }
  }
})

// 外連處理：meta.externalUrl 存在即開新分頁並返回原頁
router.beforeEach((to, from, next) => {
  const ext = to.meta && to.meta.externalUrl
  if (ext) {
    window.open(ext, '_blank')
    return next(from.fullPath || '/')
  }
  next()
})

// 動態標題
router.afterEach((to) => {
  const title = to.meta?.title ? `${to.meta.title}｜${SITE_NAME}` : SITE_NAME
  if (typeof document !== 'undefined') document.title = title
})

export default router

// 產生頂層主選單（供 Header 使用）
export function getTopMenuItems() {
  return routes
    .filter(r => r.meta && r.meta.menu)
    .sort((a, b) => (a.meta.order || 99) - (b.meta.order || 99))
    .map(r => ({
      label: r.meta.title,
      icon: r.meta.icon,
      to: { name: r.name },
      items: (r.children || [])
        .filter(c =>
          c.meta &&
          c.meta.title &&
          !c.meta.externalUrl &&
          !c.meta.hidden &&                // <— 新增：忽略隱藏
          !(typeof c.path === 'string' && c.path.includes(':')) // <— 新增：忽略動態路由
        )
        .map(c => ({ label: c.meta.title, to: { name: c.name } }))
    }))
}

