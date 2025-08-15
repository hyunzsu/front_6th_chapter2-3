import { useAtomValue } from "jotai"
import { CardContent } from "../../../../shared/ui/card"
import { usePostsWithAuthorsQuery } from "../api"
import { usePostsByTagQuery } from "../api/filterPostApi"
import { useSearchPostsQuery } from "../api/searchPostApi"
import {
  postsLimitAtom,
  postsSkipAtom,
  postsSearchQueryAtom,
  postsSelectedTagAtom,
  postsSortByAtom,
  postsSortOrderAtom,
} from "../model"
import { usePostsUrlSync } from "../hooks"
import { PaginationControls, SearchAndFilters, PostTable } from "./"

export const PostManagerList = () => {
  usePostsUrlSync()

  const limit = useAtomValue(postsLimitAtom)
  const skip = useAtomValue(postsSkipAtom)
  const searchQuery = useAtomValue(postsSearchQueryAtom)
  const selectedTag = useAtomValue(postsSelectedTagAtom)
  const sortBy = useAtomValue(postsSortByAtom)
  const sortOrder = useAtomValue(postsSortOrderAtom)

  // useQuery hooks
  const { data: postsData, isLoading: postsLoading } = usePostsWithAuthorsQuery({
    limit,
    skip,
    sortBy,
    sortOrder,
  })
  const { data: searchData, isLoading: searchLoading } = useSearchPostsQuery({
    query: searchQuery,
    limit,
    skip,
    sortBy,
    sortOrder,
  })
  const { data: tagData, isLoading: tagLoading } = usePostsByTagQuery({
    tag: selectedTag,
    limit,
    skip,
    sortBy,
    sortOrder,
  })

  // 현재 표시할 데이터 결정
  const currentData = searchQuery ? searchData : selectedTag && selectedTag !== "all" ? tagData : postsData
  const posts = currentData?.posts || []
  const total = currentData?.total || 0
  const isLoading = postsLoading || searchLoading || tagLoading

  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 컨트롤 */}
        <SearchAndFilters />
        {/* 게시물 테이블 */}
        <PostTable posts={posts} isLoading={isLoading} />
        {/* 페이지네이션 */}
        <PaginationControls total={total} />
      </div>
    </CardContent>
  )
}
