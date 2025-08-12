import { PaginationResponse } from "../../../shared/types"
import { Post, PostWithAuthor } from "./post"

export interface PostsResponse extends PaginationResponse<Post> {
  posts: Post[]
}

export interface PostsWithAuthorsResponse extends PaginationResponse<PostWithAuthor> {
  posts: PostWithAuthor[]
}
