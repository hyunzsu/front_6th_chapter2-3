// src/pages/PostsManagerPage.tsx
import { useCallback, useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAtom, useAtomValue } from "jotai"

import { Button } from "../shared/ui/button"
import { Input } from "../shared/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card"
import { Textarea } from "../shared/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shared/ui/table"

import { CreatePostData, PostWithAuthor } from "../entities/post/types"
import { UserProfile } from "../entities/user/types"
import { useTagsQuery } from "../entities/tag/api"
import { useModal } from "../shared/hooks/useModal"

import { useCreatePost } from "../features/post-management/create/api"
import { useUpdatePost, useDeletePost } from "../features/post-management/update/api"
import { usePostsWithAuthorsQuery } from "../features/post-management/list/api"
import { usePostsByTagQuery } from "../features/post-management/list/api/filterPostApi"
import { useSearchPostsQuery } from "../features/post-management/list/api/searchPostApi"
import { CommentList } from "../features/comment-management/list/ui"

// 🆕 store와 분리된 컴포넌트들 import
import {
  postsLimitAtom,
  postsSkipAtom,
  postsPageAtom,
  setPostsPageAtom,
  setPostsLimitAtom,
} from "../features/post-management/list/store"
import { PaginationControls } from "../features/post-management/list/ui"
import { UserInfoDialog } from "../features/post-management/list/ui"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const limit = useAtomValue(postsLimitAtom)
  const skip = useAtomValue(postsSkipAtom)
  const [, setPage] = useAtom(setPostsPageAtom)
  const [, setLimit] = useAtom(setPostsLimitAtom)

  // 데이터 관련 상태 (게시물만)
  const [selectedPost, setSelectedPost] = useState<PostWithAuthor | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  // 검색/필터링 상태 (아직 store로 이전하지 않음 - 3단계에서 처리)
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "")
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "")
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">((queryParams.get("sortOrder") as "asc" | "desc") || "asc")

  // 모달 상태 (게시물 관련만 - useModal 활용)
  const addPostModal = useModal()
  const editPostModal = useModal()
  const postDetailModal = useModal()
  const userModal = useModal()

  // 폼 데이터 상태
  const [newPost, setNewPost] = useState<CreatePostData>({ title: "", body: "", userId: 1 })

  // useQuery hooks
  const { data: tags = [] } = useTagsQuery()
  const { data: postsData, isLoading: postsLoading } = usePostsWithAuthorsQuery({ limit, skip })
  const { data: searchData, isLoading: searchLoading } = useSearchPostsQuery(searchQuery)
  const { data: tagData, isLoading: tagLoading } = usePostsByTagQuery(selectedTag)

  // useMutation hooks (게시물만)
  const { mutate: createPost } = useCreatePost()
  const { mutate: updatePostMutation } = useUpdatePost()
  const { mutate: deletePostMutation } = useDeletePost()

  // 현재 표시할 데이터 결정
  const currentData = searchQuery ? searchData : selectedTag ? tagData : postsData
  const posts = currentData?.posts || []
  const total = currentData?.total || 0
  const isLoading = postsLoading || searchLoading || tagLoading

  // 게시물 추가
  const addPostHandler = useCallback((): void => {
    createPost(newPost, {
      onSuccess: () => {
        addPostModal.handleModalClose()
        setNewPost({ title: "", body: "", userId: 1 })
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }, [createPost, newPost, addPostModal])

  // 게시물 수정
  const updatePostHandler = useCallback((): void => {
    if (!selectedPost) return

    updatePostMutation(
      { id: selectedPost.id, data: { title: selectedPost.title, body: selectedPost.body } },
      {
        onSuccess: () => {
          editPostModal.handleModalClose()
        },
        onError: (error) => {
          console.error("게시물 업데이트 오류:", error)
        },
      },
    )
  }, [updatePostMutation, selectedPost, editPostModal])

  // 게시물 삭제
  const deletePostHandler = useCallback(
    (id: number): void => {
      deletePostMutation(
        { id },
        {
          onError: (error) => {
            console.error("게시물 삭제 오류:", error)
          },
        },
      )
    },
    [deletePostMutation],
  )

  // 게시물 상세 보기
  const openPostDetail = (post: PostWithAuthor): void => {
    setSelectedPost(post)
    postDetailModal.handleModalOpen()
  }

  // 사용자 모달 열기 함수 수정
  const openUserModal = (user: UserProfile): void => {
    setSelectedUserId(user.id)
    userModal.handleModalOpen()
  }

  const handleUpdateURL = useCallback(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag, navigate])

  useEffect(() => {
    handleUpdateURL()
  }, [handleUpdateURL])

  // URL 파라미터 동기화 (store 사용)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const newSkip = parseInt(params.get("skip") || "0")
    const newLimit = parseInt(params.get("limit") || "10")
    const newPage = Math.floor(newSkip / newLimit) + 1

    setLimit(newLimit)
    setPage(newPage)
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder((params.get("sortOrder") as "asc" | "desc") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search, setLimit, setPage])

  // 하이라이트 함수
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post: PostWithAuthor) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => openUserModal(post.author as UserProfile)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    editPostModal.handleModalOpen()
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePostHandler(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={addPostModal.handleModalOpen}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleUpdateURL()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value)
              }}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 컴포넌트 교체 */}
          <PaginationControls total={total} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={addPostModal.isModalOpen} onOpenChange={addPostModal.handleModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPost({ ...newPost, userId: Number(e.target.value) })
              }
            />
            <Button onClick={addPostHandler}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={editPostModal.isModalOpen} onOpenChange={editPostModal.handleModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={updatePostHandler}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={postDetailModal.isModalOpen} onOpenChange={postDetailModal.handleModalClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title || "", searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>

            {/* 댓글 위젯 */}
            {selectedPost && <CommentList postId={selectedPost.id} searchQuery={searchQuery} />}
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 컴포넌트 교체 */}
      <UserInfoDialog isOpen={userModal.isModalOpen} onClose={userModal.handleModalClose} userId={selectedUserId} />
    </Card>
  )
}

export default PostsManager
