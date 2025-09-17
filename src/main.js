import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createAppRouter, setupRouterGuards } from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import './style.css'
import Tooltip from 'primevue/tooltip';

// 创建应用
const app = createApp(App)

// 创建并安装 Pinia
const pinia = createPinia()
app.use(pinia)

// 创建路由实例
const router = createAppRouter()

// 设置路由守卫（必须在 Pinia 安装后调用）
setupRouterGuards(router, pinia)

// 安装路由
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.directive('tooltip', Tooltip)

// 挂载应用
app.mount('#app')
