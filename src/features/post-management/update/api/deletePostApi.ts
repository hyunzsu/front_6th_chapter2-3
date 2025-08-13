import { api } from "../../../../shared/lib"

/**
 * 게시물 삭제 API
 * @param id - 삭제할 게시물 ID
 * @returns Promise<void>
 */
export const deletePostApi = async (id: number): Promise<void> => {
  return api.delete(`/posts/${id}`)
}
