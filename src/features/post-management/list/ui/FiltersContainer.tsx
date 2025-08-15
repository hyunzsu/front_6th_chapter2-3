import { useAtom } from "jotai"
import { useTagsQuery } from "../../../../entities/tag/api"
import { postsSelectedTagAtom, postsSortByAtom, postsSortOrderAtom, setPostsPageAtom } from "../model"
import { FilterSelect } from "./FilterSelect"

interface FiltersContainerProps {
  disabled?: boolean
}

export const FiltersContainer = ({ disabled = false }: FiltersContainerProps) => {
  const { data: tags = [] } = useTagsQuery()

  const [selectedTag, setSelectedTag] = useAtom(postsSelectedTagAtom)
  const [sortBy, setSortBy] = useAtom(postsSortByAtom)
  const [sortOrder, setSortOrder] = useAtom(postsSortOrderAtom)
  const [, setPage] = useAtom(setPostsPageAtom)

  // 태그 변경 시 첫 페이지로 이동
  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    setPage(1)
  }

  // 정렬 변경 시 첫 페이지로 이동
  const handleSortByChange = (value: string) => {
    setSortBy(value)
    setPage(1)
  }

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value as "asc" | "desc")
    setPage(1)
  }

  // 태그 옵션 생성
  const tagOptions = [
    { value: "all", label: "모든 태그" },
    ...tags.map((tag) => ({ value: tag.slug, label: tag.slug })),
  ]

  // 정렬 기준 옵션
  const sortByOptions = [
    { value: "none", label: "없음" },
    { value: "id", label: "ID" },
    { value: "title", label: "제목" },
    { value: "reactions", label: "반응" },
  ]

  // 정렬 순서 옵션
  const sortOrderOptions = [
    { value: "asc", label: "오름차순" },
    { value: "desc", label: "내림차순" },
  ]

  return (
    <div className="flex gap-4">
      {/* 태그 선택 */}
      <FilterSelect
        value={selectedTag}
        onValueChange={handleTagChange}
        placeholder="태그 선택"
        options={tagOptions}
        disabled={disabled}
      />

      {/* 정렬 기준 */}
      <FilterSelect
        value={sortBy}
        onValueChange={handleSortByChange}
        placeholder="정렬 기준"
        options={sortByOptions}
        disabled={disabled}
      />

      {/* 정렬 순서 */}
      <FilterSelect
        value={sortOrder}
        onValueChange={handleSortOrderChange}
        placeholder="정렬 순서"
        options={sortOrderOptions}
        disabled={disabled}
      />
    </div>
  )
}
