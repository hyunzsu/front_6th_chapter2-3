import { api } from "../../../../shared/lib"
import { Comment, CommentsResponse } from "../../../../entities/comment/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isNewlyCreatedComment, createMockComment } from "../../../../entities/comment/lib"

/**
 * 댓글 좋아요 API
 */
const likeCommentApi = async (id: number, likes: number): Promise<Comment> => {
  return api.patch<Comment>(`/comments/${id}`, { likes })
}

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["likeComment"],
    mutationFn: ({ id, likes }: { id: number; likes: number; postId: number }) => {
      return isNewlyCreatedComment(id)
        ? Promise.resolve(createMockComment({ id, likes }))
        : likeCommentApi(id, likes)
    },
    onMutate: async ({ id, likes, postId }: { id: number; likes: number; postId: number }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] })
      const previousData = queryClient.getQueryData<CommentsResponse>(["comments", postId])
      
      queryClient.setQueryData<CommentsResponse>(["comments", postId], (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          comments: oldData.comments.map((comment) =>
            comment.id === id ? { ...comment, likes } : comment
          ),
        }
      })
      
      return { previousData }
    },
    onError: (_, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["comments", variables.postId], context.previousData)
      }
    },
  })
}
