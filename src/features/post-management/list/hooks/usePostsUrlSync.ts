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
} from "../model"

export const usePostsUrlSync = () => {
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

  // atom → URL: atom 변경시 URL 업데이트
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

  // URL → atom: 초기 로드시 URL에서 atom 설정
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
}