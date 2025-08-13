import { api } from "../../../../shared/lib"
import { CreatePostData, PostWithAuthor } from "../../../../entities/post/types"

/**
 * 게시물 생성 API
 * @param data - 게시물 생성 데이터
 * @returns Promise<PostWithAuthor> 생성된 게시물 정보
 */
export const createPost = async (data: CreatePostData): Promise<PostWithAuthor> => {
  return api.post<PostWithAuthor>("/posts/add", data)
}
