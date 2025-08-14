import { api } from "../../../../shared/lib"
import { CreateCommentData, Comment } from "../../../../entities/comment/types"
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", data.postId],
      })
    },
  })
}
