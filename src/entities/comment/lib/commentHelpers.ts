import { EXISTING_COMMENT_MAX_ID } from "../constants"
import { Comment } from "../types"

/**
 * 새로 생성된 댓글인지 판별
 * 더미 환경에서 서버에 존재하지 않는 댓글을 구분하기 위함
 */
export const isNewlyCreatedComment = (id: number): boolean => {
  return id > EXISTING_COMMENT_MAX_ID
}

/**
 * Mock 댓글 객체 생성
 * 더미 환경에서 API 응답을 시뮬레이션하기 위함
 */
export const createMockComment = (overrides: Partial<Comment>): Comment => ({
  id: 0,
  body: "",
  postId: 0,
  likes: 0,
  user: { id: 1, username: "User", image: "" },
  ...overrides,
})
