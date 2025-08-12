import { User } from "../../user/types"

export interface PostReactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: PostReactions
}

export interface PostWithAuthor extends Post {
  author?: User
}
