import axios, { AxiosInstance, AxiosResponse } from "axios"

// API 클라이언트 생성
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "production" ? "https://dummyjson.com" : "/api",
  timeout: 5000,
  withCredentials: false, // 이거 추가 안하면 CORS 에러 뜸
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
})

// 요청 인터셉터 (공통 설정)
apiClient.interceptors.request.use(
  (config) => {
    // console.log(`[${config.method?.toUpperCase()}] ${config.url}`)
    return config
  },
  (error) => {
    console.error("Request Error:", error)
    return Promise.reject(error)
  },
)

// 응답 인터셉터 (자동 JSON 파싱 + 에러 처리)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(`[${response.config.method?.toUpperCase()}] ${response.config.url} - ${response.status}`)
    return response.data?.data || response.data // 자동으로 .data 반환
  },
  (error) => {
    const method = error.config?.method?.toUpperCase()
    const url = error.config?.url
    const status = error.response?.status

    console.error(`[${method}] ${url} - ${status}:`, error.response?.data || error.message)

    // 필요시 전역 에러 처리 추가
    // if (status === 401) {
    //   // 로그인 페이지로 리다이렉트 등
    // }

    return Promise.reject(error)
  },
)

// 편의 메서드들
export const api = {
  get: <T>(url: string): Promise<T> => apiClient.get(url),
  post: <T>(url: string, data?: unknown): Promise<T> => apiClient.post(url, data),
  put: <T>(url: string, data?: unknown): Promise<T> => apiClient.put(url, data),
  patch: <T>(url: string, data?: unknown): Promise<T> => apiClient.patch(url, data),
  delete: <T>(url: string): Promise<T> => apiClient.delete(url),
}
