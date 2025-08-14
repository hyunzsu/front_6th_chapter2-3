import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment, UpdateCommentData, CommentsResponse } from "../../../../entities/comment/types"
import { api } from "../../../../shared/lib"
import { isNewlyCreatedComment, createMockComment } from "../../../../entities/comment/lib"

/**
 * 댓글 수정 API
 */
const updateCommentApi = async (id: number, data: UpdateCommentData): Promise<Comment> => {
  return api.put<Comment>(`/comments/${id}`, data)
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updateComment"],
    mutationFn: ({ id, data }: { id: number; data: UpdateCommentData; postId: number }) => {
      return isNewlyCreatedComment(id)
        ? Promise.resolve(createMockComment({ id, body: data.body }))
        : updateCommentApi(id, data)
    },
    onMutate: async ({ id, data, postId }: { id: number; data: UpdateCommentData; postId: number }) => {
      queryClient.setQueryData<CommentsResponse>(["comments", postId], (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          comments: oldData.comments.map((comment) => (comment.id === id ? { ...comment, ...data } : comment)),
        }
      })
    },
  })
}
