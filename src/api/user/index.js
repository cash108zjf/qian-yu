import api from "@/api/api.js";


export const getUserInfo = () => {
    return api.get('/admin-api/getUserInfo')
}

export const logoutAPI = () => {
    return api.post('/auth/logout')
}

export const refreshTokenAPI = () => {
    return api.post('/auth/refresh')
}
