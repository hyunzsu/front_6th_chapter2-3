import { api } from "../../../shared/lib"
import { CommentsResponse } from "../types"

/**
 * 특정 게시물의 댓글 목록 조회
 * @param postId - 게시물 ID
 * @returns Promise<CommentsResponse> 댓글 목록 응답
 */
export const getComments = async (postId: number): Promise<CommentsResponse> => {
  return api.get<CommentsResponse>(`/comments/post/${postId}`)
}
