// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 頂部靜態 imports（依你的檔案路徑）
import Home from '@/views/home/Home.vue'

// News
import NewsIndex from '@/views/news/Index.vue'
import NewsLatest from '@/views/news/Latest.vue'
import NewsAnnouncements from '@/views/news/Announcements.vue'
import NewsEvents from '@/views/news/Events.vue'

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

// Council
import CouncilIndex from '@/views/council/Index.vue'
import CouncilChair from '@/views/council/Chair.vue'
import CouncilOrganization from '@/views/council/Organization.vue'

// Online
import OnlineIndex from '@/views/online/Index.vue'
import OnlineSurveys from '@/views/online/Surveys.vue'
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
      { path: 'events', name: 'news-events', component: NewsEvents, meta: { title: '活動專區', breadcrumb: ['首頁', '熱門消息', '活動專區'] } }
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
      { path: 'sustainability', name: 'policy-sustainability', component: PolicySustainability, meta: { title: '永續提升', breadcrumb: ['首頁', '法規政策', '永續提升'] } }
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
      { path: 'disaster', name: 'services-disaster', component: ServicesDisaster, meta: { title: '防災專區', breadcrumb: ['首頁', '便民服務', '防災專區'] } },
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
      { path: 'chair', name: 'council-chair', component: CouncilChair, meta: { title: '主席介紹', breadcrumb: ['首頁', '代表會', '主席介紹'] } },
      { path: 'organization', name: 'council-organization', component: CouncilOrganization, meta: { title: '組織介紹', breadcrumb: ['首頁', '代表會', '組織介紹'] } },
    ]
  },

  // 線上服務交流（僅保留：問卷、投票）
  {
    path: '/online',
    name: 'online',
    component: OnlineIndex,
    redirect: { name: 'online-surveys' },
    meta: { title: '線上服務交流', breadcrumb: ['首頁', '線上服務交流'], icon: 'pi pi-send', menu: true, order: 6 },
    children: [
      { path: 'surveys', name: 'online-surveys', component: OnlineSurveys, meta: { title: '問卷調查', breadcrumb: ['首頁', '線上服務交流', '問卷調查'] } },
      { path: 'votes', name: 'online-votes', component: OnlineVotes, meta: { title: '線上投票', breadcrumb: ['首頁', '線上服務交流', '線上投票'] } },
    ]
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
        .filter(c => c.meta && c.meta.title && !c.meta.externalUrl)
        .map(c => ({ label: c.meta.title, to: { name: c.name } }))
    }))
}
