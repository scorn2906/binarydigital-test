import axios, { AxiosInstance } from 'axios'
// import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { useUserStore } from '../store/useUserStore'

export class Api {
    private static instance: Api
    private axiosInstance: AxiosInstance

    private constructor(){
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            timeout: 10000,
        })
        // Add request interceptor to always use the latest token
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = useUserStore.getState().access_token
                if (token) {
                config.headers.Authorization = `Bearer ${token}`
                } else {
                delete config.headers.Authorization
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        // Optional: Add response interceptor for handling 401 errors
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                // Token expired or invalid, logout user
                useUserStore.getState().logout()
                }
                return Promise.reject(error)
            }
        )
    }

    public static getInstance(): Api {
        if(!Api.instance){
            Api.instance = new Api()
        }

        return Api.instance
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance
    }

    public setAuthorizationToken(token: string | null): void {
        if(!token) return
        this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
    }

}