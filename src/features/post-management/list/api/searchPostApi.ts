import { PostsResponse } from "../../../../entities/post/types/api"
import { api } from "../../../../shared/api"

/**
 * 게시물 검색 API
 * @param query - 검색어
 * @returns Promise<PostsResponse> 검색된 게시물 목록
 */
export const searchPosts = async (query: string): Promise<PostsResponse> => {
  return api.get<PostsResponse>(`/posts/search?q=${query}`)
}
