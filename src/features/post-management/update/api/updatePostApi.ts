import { api } from "../../../../shared/lib"
import { UpdatePostData, PostWithAuthor } from "../../../../entities/post/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isNewlyCreatedPost, createMockPost } from "../../../../entities/post/lib"

/**
 * 게시물 수정 API
 * @param id - 게시물 ID
 * @param data - 게시물 수정 데이터
 * @returns Promise<PostWithAuthor> 수정된 게시물 정보
 */
const updatePostApi = async (id: number, data: UpdatePostData): Promise<PostWithAuthor> => {
  return api.put<PostWithAuthor>(`/posts/${id}`, data)
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) => {
      return isNewlyCreatedPost(id)
        ? Promise.resolve(createMockPost({ id, title: data.title, body: data.body }))
        : updatePostApi(id, data)
    },
    onMutate: async ({ id, data }: { id: number; data: UpdatePostData }) => {
      // 모든 posts-with-authors 쿼리 캐시에서 게시물 수정
      queryClient.setQueriesData({ queryKey: ["posts-with-authors"] }, (oldData: { posts: PostWithAuthor[]; total: number } | undefined) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          posts: oldData.posts.map((post: PostWithAuthor) =>
            post.id === id ? { ...post, title: data.title, body: data.body } : post
          ),
        }
      })
    },
  })
}
