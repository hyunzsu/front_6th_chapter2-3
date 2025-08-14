import { Plus } from "lucide-react"
import { useAtomValue } from "jotai"
import { Button } from "../../../../shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/ui/card"
import { useModal } from "../../../../shared/hooks/useModal"
import { usePostsWithAuthorsQuery } from "../api"
import { usePostsByTagQuery } from "../api/filterPostApi"
import { useSearchPostsQuery } from "../api/searchPostApi"
import { postsLimitAtom, postsSkipAtom, postsSearchQueryAtom, postsSelectedTagAtom, postsSortByAtom, postsSortOrderAtom } from "../store"
import { PaginationControls, SearchAndFilters, PostTable } from "./"
import { PostFormDialog } from "../../shared/ui"

export const PostManagerList = () => {
  const limit = useAtomValue(postsLimitAtom)
  const skip = useAtomValue(postsSkipAtom)
  const searchQuery = useAtomValue(postsSearchQueryAtom)
  const selectedTag = useAtomValue(postsSelectedTagAtom)
  const sortBy = useAtomValue(postsSortByAtom)
  const sortOrder = useAtomValue(postsSortOrderAtom)

  const {
    isModalOpen: isAddPostModalOpen,
    handleModalOpen: handleAddPostModalOpen,
    handleModalClose: handleAddPostModalClose,
  } = useModal()

  // useQuery hooks
  const { data: postsData, isLoading: postsLoading } = usePostsWithAuthorsQuery({ 
    limit, 
    skip, 
    sortBy,
    sortOrder 
  })
  const { data: searchData, isLoading: searchLoading } = useSearchPostsQuery({
    query: searchQuery,
    limit,
    skip,
    sortBy,
    sortOrder
  })
  const { data: tagData, isLoading: tagLoading } = usePostsByTagQuery({
    tag: selectedTag,
    limit,
    skip,
    sortBy,
    sortOrder
  })

  // 현재 표시할 데이터 결정
  const currentData = searchQuery ? searchData : selectedTag && selectedTag !== "all" ? tagData : postsData
  const posts = currentData?.posts || []
  const total = currentData?.total || 0
  const isLoading = postsLoading || searchLoading || tagLoading

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <Button onClick={handleAddPostModalOpen}>
              <Plus className="w-4 h-4 mr-2" />
              게시물 추가
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* 검색 및 필터 컨트롤 */}
            <SearchAndFilters isLoading={isLoading} />

            {/* 게시물 테이블 */}
            <PostTable posts={posts} isLoading={isLoading} />

            {/* 페이지네이션 */}
            <PaginationControls total={total} />
          </div>
        </CardContent>
      </Card>

      <PostFormDialog mode="create" isOpen={isAddPostModalOpen} onClose={handleAddPostModalClose} />
    </>
  )
}
