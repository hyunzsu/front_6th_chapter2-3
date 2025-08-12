// API 관련 공통 타입
export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
}

export interface ApiError {
  message: string
  status?: number
}
