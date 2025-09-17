import axios from 'axios'
import { getToken, isTokenExpired } from '@/utils/auth.js'
import { useAuthStore } from '@/stores/store.js'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true

            const token = getToken()
            if (token && !isTokenExpired(token)) {
                const authStore = useAuthStore()
                try {
                    const newToken = await authStore.refreshToken()
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    return api(originalRequest)
                } catch (refreshError) {
                    await authStore.logout()
                    window.location.href = '/login'
                    return Promise.reject(refreshError)
                }
            } else {
                const authStore = useAuthStore()
                await authStore.logout()
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)
export default api
