import { useQuery } from "@tanstack/react-query"
import { PostsResponse } from "../../../../entities/post/types/api"
import { api } from "../../../../shared/lib"

/**
 * 태그별 게시물 조회 API
 */
export const fetchPostsByTag = async (params: {
  tag: string
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

  return api.get<PostsResponse>(`/posts/tag/${params.tag}?${queryParams.toString()}`)
}

export const usePostsByTagQuery = (params: {
  tag: string
  limit: number
  skip: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) => {
  return useQuery({
    queryKey: ["posts-by-tag", params],
    queryFn: () => fetchPostsByTag(params),
    enabled: !!params.tag && params.tag !== "all",
  })
}
