import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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

export default router
