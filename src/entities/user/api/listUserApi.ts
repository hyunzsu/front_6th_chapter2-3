import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/lib"
import { UsersResponse } from "../types"

/**
 * 사용자 목록 조회
 */
export const fetchUsers = async (params?: { limit?: number; select?: string }): Promise<UsersResponse> => {
  const searchParams = new URLSearchParams()
  if (params?.limit !== undefined) searchParams.set("limit", params.limit.toString())
  if (params?.select) searchParams.set("select", params.select)

  const queryString = searchParams.toString()
  return api.get<UsersResponse>(`/users${queryString ? `?${queryString}` : ""}`)
}

export const useUsersQuery = (params?: { limit?: number; select?: string }) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  })
}
