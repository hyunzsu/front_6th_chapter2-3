import { api } from "../../../../shared/lib"
import { Comment } from "../../../../entities/comment/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

/**
 * 댓글 좋아요 API
 */
export const likeCommentApi = async (id: number, likes: number): Promise<Comment> => {
  return api.patch<Comment>(`/comments/${id}`, { likes })
}

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeCommentApi(id, likes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.id],
      })
    },
  })
}
