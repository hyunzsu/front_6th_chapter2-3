import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/lib"
import { Tag } from "../types"

/**
 * 태그 목록 조회
 */
const fetchTags = async (): Promise<Tag[]> => {
  return api.get<Tag[]>("/posts/tags")
}

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  })
}
