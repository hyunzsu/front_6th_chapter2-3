import { api } from "../../../shared/lib"
import { Tag } from "../types"

/**
 * 태그 목록 조회
 * @returns Promise<Tag[]> 태그 배열
 */
export const getTags = async (): Promise<Tag[]> => {
  return api.get<Tag[]>("/posts/tags")
}
