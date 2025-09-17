import { createRouter, createWebHistory } from 'vue-router'

// 先定义路由，不立即创建 router 实例
const routes = [
  {
    path: '/',
    name: 'frame',
    component: () => import('../views/frame-home/index.vue'),
    children: [
        {
          path: '/',
          redirect: '/time'
        },
        {
            path: '/time',
            name: 'Time-axis',
            component: () => import('../views/display/time-axis/index.vue')
        },
        {
            path: '/earth',
            name: 'Earth-map',
            component: () => import('../views/display/earth-map/index.vue')
        }
    ],
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { requiresAuth: false },
  },
]

// 创建路由实例的函数
export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    routes,
  })
}

// 设置路由守卫的函数（在 Pinia 安装后调用）
export function setupRouterGuards(router, pinia) {
  router.beforeEach(async (to, from, next) => {
    // 在守卫内部动态导入 store
    const { useAuthStore } = await import('../stores/store.js')
    const authStore = useAuthStore(pinia)

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    // eslint-disable-next-line no-undef
    console.log(requiresAuth && !authStore.isLoggedIn)
    if (requiresAuth && !authStore.isLoggedIn) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else if (to.name === 'Login' && authStore.isLoggedIn) {
      next({ name: 'Time-axis' })
    } else {
      next()
    }
  })
}
