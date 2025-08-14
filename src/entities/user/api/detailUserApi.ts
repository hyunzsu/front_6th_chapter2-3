import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/lib"
import { UserProfile } from "../types"

/**
 * 사용자 상세 정보 조회
 */
const fetchUserById = async (id: number): Promise<UserProfile> => {
  return api.get<UserProfile>(`/users/${id}`)
}

export const useUserQuery = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  })
}
