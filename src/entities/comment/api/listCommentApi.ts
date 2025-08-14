import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/lib"
import { CommentsResponse } from "../types"

/**
 * 특정 게시물의 댓글 목록 조회
 */
const fetchComments = async (postId: number): Promise<CommentsResponse> => {
  return api.get<CommentsResponse>(`/comments/post/${postId}`)
}

export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  })
}
