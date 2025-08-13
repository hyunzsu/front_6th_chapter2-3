import { api } from "../../../../shared/api"
import { UpdatePostData, PostWithAuthor } from "../../../../entities/post/types"

/**
 * 게시물 수정 API
 * @param id - 게시물 ID
 * @param data - 게시물 수정 데이터
 * @returns Promise<PostWithAuthor> 수정된 게시물 정보
 */
export const updatePostApi = async (id: number, data: UpdatePostData): Promise<PostWithAuthor> => {
  return api.put<PostWithAuthor>(`/posts/${id}`, data)
}
