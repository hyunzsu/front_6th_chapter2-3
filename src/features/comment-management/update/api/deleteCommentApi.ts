import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../../../shared/lib"

/**
 * 댓글 삭제 API
 * @param id - 삭제할 댓글 ID
 * @returns Promise<void>
 */
export const deleteCommentApi = async (id: number): Promise<void> => {
  return api.delete(`/comments/${id}`)
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteCommentApi(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.id],
      })
    },
  })
}
