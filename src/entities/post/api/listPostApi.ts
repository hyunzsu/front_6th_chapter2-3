import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/lib"
import { PostsResponse } from "../types/api"

/**
 * 게시물 목록 조회
 */
export const fetchPosts = async (params: {
  limit: number
  skip: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}): Promise<PostsResponse> => {
  const queryParams = new URLSearchParams({
    limit: params.limit.toString(),
    skip: params.skip.toString(),
  })

  const actualSortBy = params.sortBy === "none" ? "id" : params.sortBy

  if (actualSortBy && params.sortOrder) {
    queryParams.set("sortBy", actualSortBy)
    queryParams.set("order", params.sortOrder)
  }

  return api.get<PostsResponse>(`/posts?${queryParams.toString()}`)
}

export const usePostsQuery = (params: { limit: number; skip: number; sortBy?: string; sortOrder?: "asc" | "desc" }) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  })
}
