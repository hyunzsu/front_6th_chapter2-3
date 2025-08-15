import { atom } from "jotai"

/** 게시물 목록 페이지네이션 */
export const postsLimitAtom = atom(10)
export const postsSkipAtom = atom(0)
export const postsPageAtom = atom(1)

/** 게시물 검색/필터링 */
export const postsSearchQueryAtom = atom("")
export const postsSelectedTagAtom = atom("all")
export const postsSortByAtom = atom("none")
export const postsSortOrderAtom = atom<"asc" | "desc">("asc")

/** 게시물 목록 조회 조건 (query string) */
export const postsQueryStringAtom = atom((get) => {
  // 1) 모든 관련 atom들의 현재 값을 가져옴
  const limit = get(postsLimitAtom)
  const skip = get(postsSkipAtom)
  const searchQuery = get(postsSearchQueryAtom)
  const selectedTag = get(postsSelectedTagAtom)
  const sortBy = get(postsSortByAtom)
  const sortOrder = get(postsSortOrderAtom)

  // 2) 기본 파라미터를 객체로 준비
  const params: Record<string, string> = {
    limit: String(limit),
    skip: String(skip),
  }

  // 3) 조건에 맞는 파라미터만 추가
  if (searchQuery.trim()) params.search = searchQuery
  if (selectedTag && selectedTag !== "all") params.tag = selectedTag
  if (sortBy && sortBy !== "none") params.sortBy = sortBy
  if (sortOrder !== "asc") params.sortOrder = sortOrder

  // 4) URLSearchParams로 쿼리 문자열 생성
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value)
  })

  return searchParams.toString()
})

/** 필터 적용 여부 확인 */
export const hasPostsFilterAtom = atom((get) => {
  const searchQuery = get(postsSearchQueryAtom)
  const selectedTag = get(postsSelectedTagAtom)
  const sortBy = get(postsSortByAtom)

  return searchQuery.trim() !== "" || selectedTag !== "all" || sortBy !== "none"
})

/** 모든 필터 초기화 */
export const resetPostsFiltersAtom = atom(null, (_, set) => {
  set(postsLimitAtom, 10)
  set(postsSkipAtom, 0)
  set(postsPageAtom, 1)
  set(postsSearchQueryAtom, "")
  set(postsSelectedTagAtom, "all")
  set(postsSortByAtom, "none")
  set(postsSortOrderAtom, "asc")
})

/** 검색/필터만 초기화 */
export const resetPostsSearchFiltersAtom = atom(null, (_, set) => {
  set(postsSearchQueryAtom, "")
  set(postsSelectedTagAtom, "all")
  set(postsSortByAtom, "none")
  set(postsSortOrderAtom, "asc")
  set(postsPageAtom, 1)
  set(postsSkipAtom, 0)
})

/** 페이지 변경 시 skip 값 계산 */
export const setPostsPageAtom = atom(null, (get, set, page: number) => {
  const limit = get(postsLimitAtom)
  set(postsPageAtom, page)
  set(postsSkipAtom, (page - 1) * limit)
})

/** limit 변경 시 skip 값 재계산 */
export const setPostsLimitAtom = atom(null, (get, set, limit: number) => {
  const page = get(postsPageAtom)
  set(postsLimitAtom, limit)
  set(postsSkipAtom, (page - 1) * limit)
})
