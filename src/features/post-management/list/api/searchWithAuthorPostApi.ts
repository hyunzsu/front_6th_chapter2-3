import { useQuery } from "@tanstack/react-query"
import { Post, PostWithAuthor } from "../../../../entities/post/types"
import { fetchUsers } from "../../../../entities/user/api"
import { User } from "../../../../entities/user/types"
import { fetchSearchPosts } from "./searchPostApi"

/**
 * 검색된 게시물 + 작성자 정보 복합 조회
 */
const fetchSearchPostsWithAuthors = async (query: string): Promise<{ posts: PostWithAuthor[]; total: number }> => {
  const [postsData, usersData] = await Promise.all([
    fetchSearchPosts({ query, limit: 0, skip: 0, sortBy: "none", sortOrder: "asc" }),
    fetchUsers({ limit: 0, select: "username,image" }),
  ])

  const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))

  return { posts: postsWithUsers, total: postsData.total }
}

export const useSearchPostsWithAuthorsQuery = (query: string) => {
  return useQuery({
    queryKey: ["search-posts-with-authors", query],
    queryFn: () => fetchSearchPostsWithAuthors(query),
    enabled: !!query.trim(),
  })
}
