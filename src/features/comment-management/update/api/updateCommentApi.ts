import { Comment, UpdateCommentData } from "../../../../entities/comment/types"
import { api } from "../../../../shared/lib"

/**
 * 댓글 수정 API
 * @param id - 댓글 ID
 * @param data - 댓글 수정 데이터
 * @returns Promise<Comment> 수정된 댓글 정보
 */
export const updateCommentApi = async (id: number, data: UpdateCommentData): Promise<Comment> => {
  return api.put<Comment>(`/comments/${id}`, data)
}
