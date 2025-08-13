import { api } from "../../../../shared/api"
import { CreateCommentData, Comment } from "../../../../entities/comment/types"

/**
 * 댓글 생성 API
 * @param data - 댓글 생성 데이터
 * @returns Promise<Comment> 생성된 댓글 정보
 */
export const createComment = async (data: CreateCommentData): Promise<Comment> => {
  return api.post<Comment>("/comments/add", data)
}
