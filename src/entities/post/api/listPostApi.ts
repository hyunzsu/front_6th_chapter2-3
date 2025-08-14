import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/lib"
import { PostsResponse } from "../types/api"

/**
 * 게시물 목록 조회
 */
export const fetchPosts = async (params: { limit: number; skip: number }): Promise<PostsResponse> => {
  return api.get<PostsResponse>(`/posts?limit=${params.limit}&skip=${params.skip}`)
}

export const usePostsQuery = (params: { limit: number; skip: number }) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  })
}
