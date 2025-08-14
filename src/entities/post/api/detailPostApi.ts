import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/lib"
import { Post } from "../types"

/**
 * 게시물 상세 조회
 */
const fetchPostById = async (id: number): Promise<Post> => {
  return api.get<Post>(`/posts/${id}`)
}

export const usePostQuery = (id: number) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  })
}
