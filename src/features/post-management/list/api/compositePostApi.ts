import { getPosts } from "../../../../entities/post/api/postApi"
import { getUsers } from "../../../../entities/user/api/userApi"
import { searchPosts } from "./searchPostApi"
import { getPostsByTag } from "./filterPostApi"
import { PostWithAuthor, Post } from "../../../../entities/post/types"
import { User } from "../../../../entities/user/types"

/**
 * 게시물 + 작성자 정보 복합 조회 (기본 목록)
 * @param params - 페이지네이션 파라미터
 * @returns Promise<{posts: PostWithAuthor[], total: number}> 작성자 정보가 포함된 게시물 목록
 */
export const getPostsWithAuthors = async (params: {
  limit: number
  skip: number
}): Promise<{ posts: PostWithAuthor[]; total: number }> => {
  const [postsData, usersData] = await Promise.all([getPosts(params), getUsers({ limit: 0, select: "username,image" })])

  const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))

  return { posts: postsWithUsers, total: postsData.total }
}

/**
 * 검색된 게시물 + 작성자 정보 복합 조회
 * @param query - 검색어
 * @returns Promise<{posts: PostWithAuthor[], total: number}> 검색된 게시물 + 작성자 정보
 */
export const searchPostsWithAuthors = async (query: string): Promise<{ posts: PostWithAuthor[]; total: number }> => {
  const [postsData, usersData] = await Promise.all([
    searchPosts(query),
    getUsers({ limit: 0, select: "username,image" }),
  ])

  const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))

  return { posts: postsWithUsers, total: postsData.total }
}

/**
 * 태그별 게시물 + 작성자 정보 복합 조회
 * @param tag - 태그명
 * @returns Promise<{posts: PostWithAuthor[], total: number}> 태그별 게시물 + 작성자 정보
 */
export const getPostsByTagWithAuthors = async (tag: string): Promise<{ posts: PostWithAuthor[]; total: number }> => {
  const [postsData, usersData] = await Promise.all([
    getPostsByTag(tag),
    getUsers({ limit: 0, select: "username,image" }),
  ])

  const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))

  return { posts: postsWithUsers, total: postsData.total }
}
