import api from "@/api/api.js";


export const loginAPI = (credentials) => {
    return api.post('/admin-api/auth/login', credentials)
}

export const logoutAPI = () => {
    return api.post('/auth/logout')
}

export const refreshTokenAPI = () => {
    return api.post('/auth/refresh')
}
