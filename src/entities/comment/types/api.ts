import { Comment } from "./comment"
import { PaginationResponse } from "../../../shared/types"

export interface CommentsResponse extends PaginationResponse<Comment> {
  comments: Comment[]
}
