import { useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAtom, useAtomValue } from "jotai"
import {
  postsSearchQueryAtom,
  postsSelectedTagAtom,
  postsSortByAtom,
  postsSortOrderAtom,
  setPostsPageAtom,
  setPostsLimitAtom,
  postsQueryStringAtom,
} from "../features/post-management/list/model"
import { PostManagerList } from "../features/post-management/list/ui"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // URL 동기화를 위한 상태들
  const queryString = useAtomValue(postsQueryStringAtom)
  const [, setPage] = useAtom(setPostsPageAtom)
  const [, setLimit] = useAtom(setPostsLimitAtom)
  const [, setSearchQuery] = useAtom(postsSearchQueryAtom)
  const [, setSelectedTag] = useAtom(postsSelectedTagAtom)
  const [, setSortBy] = useAtom(postsSortByAtom)
  const [, setSortOrder] = useAtom(postsSortOrderAtom)

  // URL 업데이트 로직
  const handleUpdateURL = useCallback(() => {
    if (queryString) {
      navigate(`?${queryString}`)
    } else {
      navigate(location.pathname)
    }
  }, [queryString, navigate, location.pathname])

  useEffect(() => {
    handleUpdateURL()
  }, [handleUpdateURL])

  // URL 파라미터 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const newSkip = parseInt(params.get("skip") || "0")
    const newLimit = parseInt(params.get("limit") || "10")
    const newPage = Math.floor(newSkip / newLimit) + 1

    setLimit(newLimit)
    setPage(newPage)
    setSearchQuery(params.get("search") || "")
    setSelectedTag(params.get("tag") || "all")
    setSortBy(params.get("sortBy") || "none")
    setSortOrder((params.get("sortOrder") as "asc" | "desc") || "asc")
  }, [location.search, setLimit, setPage, setSearchQuery, setSelectedTag, setSortBy, setSortOrder])

  return <PostManagerList />
}

export default PostsManager
