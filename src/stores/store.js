import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginAPI, logoutAPI, refreshTokenAPI } from '@/api/auth/index.js'
import { getToken, setToken, removeToken } from '@/utils/auth'
// Pinia 认证存储
export const useAuthStore = defineStore('auth', () => {
    const token = ref(getToken())
    const user = ref(null)
    const isLoggedIn = computed(() => !!token.value)

    const login = async (credentials) => {
        try {
            const response = await loginAPI(credentials)
            const { token: newToken, user: userData } = response.data

            token.value = newToken
            user.value = userData
            setToken(newToken)

            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const logout = async () => {
        try {
            await logoutAPI()
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            token.value = null
            user.value = null
            removeToken()
        }
    }

    const refreshToken = async () => {
        try {
            const response = await refreshTokenAPI()
            const { token: newToken } = response.data

            token.value = newToken
            setToken(newToken)

            return Promise.resolve(newToken)
        } catch (error) {
            await logout()
            return Promise.reject(error)
        }
    }

    return {
        token,
        user,
        isLoggedIn,
        login,
        logout,
        refreshToken
    }
})
