import { useQuery } from "@tanstack/react-query"
import { Post, PostWithAuthor } from "../../../../entities/post/types"
import { fetchUsers } from "../../../../entities/user/api"
import { User } from "../../../../entities/user/types"
import { fetchPostsByTag } from "./filterPostApi"

/**
 * 태그별 게시물 + 작성자 정보 복합 조회
 */
const fetchPostsByTagWithAuthors = async (tag: string): Promise<{ posts: PostWithAuthor[]; total: number }> => {
  const [postsData, usersData] = await Promise.all([
    fetchPostsByTag({ tag, limit: 0, skip: 0, sortBy: "none", sortOrder: "asc" }),
    fetchUsers({ limit: 0, select: "username,image" }),
  ])

  const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))

  return { posts: postsWithUsers, total: postsData.total }
}

export const usePostsByTagWithAuthorsQuery = (tag: string) => {
  return useQuery({
    queryKey: ["posts-by-tag-with-authors", tag],
    queryFn: () => fetchPostsByTagWithAuthors(tag),
    enabled: !!tag && tag !== "all",
  })
}
