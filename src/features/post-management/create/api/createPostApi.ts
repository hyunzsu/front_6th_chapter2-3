import { api } from "../../../../shared/lib"
import { CreatePostData, PostWithAuthor } from "../../../../entities/post/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

/**
 * 게시물 생성 API
 * @param data - 게시물 생성 데이터
 * @returns Promise<PostWithAuthor> 생성된 게시물 정보
 */
export const createPost = async (data: CreatePostData): Promise<PostWithAuthor> => {
  return api.post<PostWithAuthor>("/posts/add", data)
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: (data: CreatePostData) => createPost(data),
    onSuccess: (response) => {
      // 모든 posts-with-authors 쿼리 캐시에 새 게시물 추가
      queryClient.setQueriesData({ queryKey: ["posts-with-authors"] }, (oldData: { posts: PostWithAuthor[]; total: number } | undefined) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          posts: [response, ...oldData.posts],
          total: oldData.total + 1
        }
      })
    },
  })
}
