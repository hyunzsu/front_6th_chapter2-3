import { api } from "../../../../shared/lib"
import { CreateCommentData, Comment, CommentsResponse } from "../../../../entities/comment/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

/**
 * 댓글 생성 API
 */
export const createComment = async (data: CreateCommentData): Promise<Comment> => {
  return api.post<Comment>("/comments/add", data)
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: (data: CreateCommentData) => createComment(data),
    onSuccess: (response, variables) => {
      // Optimistic Update: 캐시에 직접 새 댓글 추가
      queryClient.setQueryData(["comments", variables.postId], (oldData: CommentsResponse | undefined) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          comments: [response, ...oldData.comments],
          total: oldData.total + 1,
        }
      })
    },
  })
}
