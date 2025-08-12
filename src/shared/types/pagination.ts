// 페이지네이션 관련
export interface PaginationParams {
  skip: number
  limit: number
}

export interface PaginationResponse<T> {
  data: T[]
  total: number
  skip: number
  limit: number
}
