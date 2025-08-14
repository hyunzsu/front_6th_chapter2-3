import { EXISTING_COMMENT_MAX_ID } from "../constants"

/**
 * 새로 생성된 댓글인지 판별
 * 더미 환경에서 서버에 존재하지 않는 댓글을 구분하기 위함
 */
export const isNewlyCreatedComment = (id: number): boolean => {
  return id > EXISTING_COMMENT_MAX_ID
}
