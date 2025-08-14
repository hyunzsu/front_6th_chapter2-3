import { useQuery } from "@tanstack/react-query"
import { PostsResponse } from "../../../../entities/post/types/api"
import { api } from "../../../../shared/lib"

/**
 * 게시물 검색 API
 */
export const fetchSearchPosts = async (params: {
  query: string
  limit: number
  skip: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}): Promise<PostsResponse> => {
  const queryParams = new URLSearchParams({
    q: params.query,
    limit: params.limit.toString(),
    skip: params.skip.toString(),
  })

  const actualSortBy = params.sortBy === "none" ? "id" : params.sortBy

  if (actualSortBy && params.sortOrder) {
    queryParams.set("sortBy", actualSortBy)
    queryParams.set("order", params.sortOrder)
  }

  return api.get<PostsResponse>(`/posts/search?${queryParams.toString()}`)
}

export const useSearchPostsQuery = (params: {
  query: string
  limit: number
  skip: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) => {
  return useQuery({
    queryKey: ["search-posts", params],
    queryFn: () => fetchSearchPosts(params),
    enabled: !!params.query.trim(),
  })
}
