import { api } from "../../../../shared/lib"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PostWithAuthor } from "../../../../entities/post/types"
import { isNewlyCreatedPost } from "../../../../entities/post/lib"

/**
 * 게시물 삭제 API
 * @param id - 삭제할 게시물 ID
 * @returns Promise<void>
 */
const deletePostApi = async (id: number): Promise<void> => {
  return api.delete(`/posts/${id}`)
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: ({ id }: { id: number }) => {
      return isNewlyCreatedPost(id) ? Promise.resolve() : deletePostApi(id)
    },
    onMutate: async ({ id }: { id: number }) => {
      // 모든 posts-with-authors 쿼리 캐시에서 게시물 제거
      queryClient.setQueriesData({ queryKey: ["posts-with-authors"] }, (oldData: { posts: PostWithAuthor[]; total: number } | undefined) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          posts: oldData.posts.filter((post: PostWithAuthor) => post.id !== id),
          total: oldData.total - 1,
        }
      })
    },
  })
}
