import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

export const routeLoading = ref(false)

const routes: RouteRecordRaw[] = [
  {
    path: '/masuk',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { public: true, bare: true },
  },
  {
    path: '/daftar',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { public: true, bare: true },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { nav: 'home' },
  },
  {
    path: '/belajar',
    name: 'learn',
    component: () => import('../views/LearnView.vue'),
    meta: { nav: 'learn' },
  },
  {
    path: '/belajar/:track',
    name: 'track',
    component: () => import('../views/TrackView.vue'),
    meta: { nav: 'learn' },
    props: true,
  },
  {
    path: '/belajar/:track/:lesson',
    name: 'lesson',
    component: () => import('../views/LessonView.vue'),
    meta: { nav: 'learn' },
    props: true,
  },
  {
    path: '/latihan',
    name: 'play',
    component: () => import('../views/PlaygroundView.vue'),
    meta: { nav: 'play' },
  },
  {
    path: '/koleksi',
    name: 'collection',
    component: () => import('../views/CollectionView.vue'),
    meta: { nav: 'collection' },
  },
  {
    path: '/tentang',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { nav: 'about' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, saved) {
    return saved ?? { top: 0 }
  },
})

router.beforeEach((to) => {
  routeLoading.value = true
  const { isAuthenticated } = useAuth()

  if (to.meta.public) {
    if (isAuthenticated.value && (to.name === 'login' || to.name === 'register')) {
      return { name: 'home' }
    }
    return true
  }

  if (!isAuthenticated.value) {
    return { name: 'login', query: to.fullPath === '/' ? {} : { redirect: to.fullPath } }
  }

  return true
})

router.afterEach((_to, from) => {
  routeLoading.value = false
  if (!from.name) return
  requestAnimationFrame(() => {
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
  })
})

router.onError(() => {
  routeLoading.value = false
})

export default router
