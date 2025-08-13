import { PostsResponse } from "../../../../entities/post/types/api"
import { api } from "../../../../shared/api"

/**
 * 태그별 게시물 조회 API
 * @param tag - 태그명
 * @returns Promise<PostsResponse> 태그별 게시물 목록
 */
export const getPostsByTag = async (tag: string): Promise<PostsResponse> => {
  return api.get<PostsResponse>(`/posts/tag/${tag}`)
}
