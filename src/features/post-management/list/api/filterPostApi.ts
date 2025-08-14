import { useQuery } from "@tanstack/react-query"
import { PostsResponse } from "../../../../entities/post/types/api"
import { api } from "../../../../shared/lib"

/**
 * 태그별 게시물 조회 API
 */
export const fetchPostsByTag = async (tag: string): Promise<PostsResponse> => {
  return api.get<PostsResponse>(`/posts/tag/${tag}`)
}

export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: ["posts-by-tag", tag],
    queryFn: () => fetchPostsByTag(tag),
    enabled: !!tag && tag !== "all",
  })
}
