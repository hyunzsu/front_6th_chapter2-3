import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentsResponse } from "../../../../entities/comment/types"
import { api } from "../../../../shared/lib"
import { isNewlyCreatedComment } from "../../../../entities/comment/lib"

/**
 * 댓글 삭제 API
 */
const deleteCommentApi = async (id: number): Promise<void> => {
  return api.delete(`/comments/${id}`)
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: ({ id }: { id: number; postId: number }) => {
      return isNewlyCreatedComment(id) ? Promise.resolve() : deleteCommentApi(id)
    },
    onMutate: async ({ id, postId }: { id: number; postId: number }) => {
      queryClient.setQueryData<CommentsResponse>(["comments", postId], (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          comments: oldData.comments.filter((comment) => comment.id !== id),
          total: oldData.total - 1,
        }
      })
    },
  })
}
