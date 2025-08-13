import { api } from "../../../shared/lib"
import { Post } from "../types"
import { PostsResponse } from "../types/api"

/**
 * 게시물 목록 조회
 * @param params - limit, skip 등의 페이지네이션 파라미터
 * @returns Promise<PostsResponse> 게시물 목록 응답
 */
export const getPosts = async (params: { limit: number; skip: number }): Promise<PostsResponse> => {
  return api.get<PostsResponse>(`/posts?limit=${params.limit}&skip=${params.skip}`)
}

/**
 * 게시물 상세 조회
 * @param id - 게시물 ID
 * @returns Promise<Post> 게시물 상세 정보
 */
export const getPostById = async (id: number): Promise<Post> => {
  return api.get<Post>(`/posts/${id}`)
}
