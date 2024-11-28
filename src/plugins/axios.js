import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

let apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

apiClient.interceptors.request.use((config) => {

    let authStore = useAuthStore()
    let token = authStore.token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

export default apiClient