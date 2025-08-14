import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment, UpdateCommentData } from "../../../../entities/comment/types"
import { api } from "../../../../shared/lib"

/**
 * 댓글 수정 API
 */
export const updateCommentApi = async (id: number, data: UpdateCommentData): Promise<Comment> => {
  return api.put<Comment>(`/comments/${id}`, data)
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updateComment"],
    mutationFn: ({ id, data }: { id: number; data: UpdateCommentData }) => updateCommentApi(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", data.postId],
      })
    },
  })
}
