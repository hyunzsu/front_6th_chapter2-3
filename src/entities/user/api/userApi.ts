import { api } from "../../../shared/lib"
import { UserProfile, UsersResponse } from "../types"

/**
 * 사용자 목록 조회
 * @param params - limit, select 등의 쿼리 파라미터
 * @returns Promise<UsersResponse> 사용자 목록 응답
 */
export const getUsers = async (params?: { limit?: number; select?: string }): Promise<UsersResponse> => {
  const searchParams = new URLSearchParams()
  if (params?.limit !== undefined) searchParams.set("limit", params.limit.toString())
  if (params?.select) searchParams.set("select", params.select)

  const queryString = searchParams.toString()
  return api.get<UsersResponse>(`/users${queryString ? `?${queryString}` : ""}`)
}

/**
 * 사용자 상세 정보 조회
 * @param id - 사용자 ID
 * @returns Promise<UserProfile> 사용자 상세 정보
 */
export const getUserById = async (id: number): Promise<UserProfile> => {
  return api.get<UserProfile>(`/users/${id}`)
}
