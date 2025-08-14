import { EXISTING_POST_MAX_ID } from "../constants"
import { PostWithAuthor } from "../types"

/**
 * 새로 생성된 게시물인지 판별
 * 더미 환경에서 서버에 존재하지 않는 게시물을 구분하기 위함
 */
export const isNewlyCreatedPost = (id: number): boolean => {
  return id > EXISTING_POST_MAX_ID
}

/**
 * Mock 게시물 객체 생성
 * 더미 환경에서 API 응답을 시뮬레이션하기 위함
 */
export const createMockPost = (overrides: Partial<PostWithAuthor>): PostWithAuthor => ({
  id: 0,
  title: "",
  body: "",
  userId: 1,
  author: { id: 1, username: "User", image: "" },
  tags: [],
  reactions: { likes: 0, dislikes: 0 },
  ...overrides,
})
