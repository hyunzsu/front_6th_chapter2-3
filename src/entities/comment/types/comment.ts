import { User } from "../../user/types"

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: User
}

// 게시물별 댓글 상태 매핑
export interface CommentsByPost {
  [postId: number]: Comment[]
}
