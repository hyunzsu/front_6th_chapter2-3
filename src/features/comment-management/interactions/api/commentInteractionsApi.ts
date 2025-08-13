import { api } from "../../../../shared/api"
import { Comment } from "../../../../entities/comment/types"

/**
 * 댓글 좋아요 API
 * @param id - 댓글 ID
 * @param likes - 업데이트할 좋아요 수
 * @returns Promise<Comment> 업데이트된 댓글 정보
 */
export const likeCommentApi = async (id: number, likes: number): Promise<Comment> => {
  return api.patch<Comment>(`/comments/${id}`, { likes })
}
