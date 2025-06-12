// ใส่ Code นี้ในไฟล์ index.ts ของโฟลเดอร์ api
import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosError } from 'axios'

export const createInstance = (domain: string): AxiosInstance => {
   const instance: AxiosInstance = axios.create({
    baseURL: `${domain}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // Request interceptor (สำหรับปรับแต่ง request ก่อนส่ง)
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      // สามารถปรับแต่ง request ได้ที่นี่ เช่น การเพิ่ม headers Authorization การเพิ่ม header multipart-formdata เป็นต้น
      const accessToken = ''
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
      return config
    },
    (error: AxiosError): Promise<AxiosError> => {
      console.error('Request error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor (สำหรับปรับแต่ง response ก่อนใช้งาน)
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError): Promise<AxiosError> => {
      console.error('Response error:', error)
      return Promise.reject(error)
    }
  )

  return instance
}

// ใน Vite environment variables จะต้องมี prefix "VITE_"
const instance: AxiosInstance = createInstance(
  import.meta.env.VITE_HOSPITAL_DOMAIN as string
)

export { instance }
