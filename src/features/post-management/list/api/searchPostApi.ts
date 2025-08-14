import { useQuery } from "@tanstack/react-query"
import { PostsResponse } from "../../../../entities/post/types/api"
import { api } from "../../../../shared/lib"

/**
 * 게시물 검색 API
 */
export const fetchSearchPosts = async (query: string): Promise<PostsResponse> => {
  return api.get<PostsResponse>(`/posts/search?q=${query}`)
}

export const useSearchPostsQuery = (query: string) => {
  return useQuery({
    queryKey: ["search-posts", query],
    queryFn: () => fetchSearchPosts(query),
    enabled: !!query.trim(),
  })
}
