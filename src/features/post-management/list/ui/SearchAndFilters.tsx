import { SearchInput } from "./SearchInput"
import { FiltersContainer } from "./FiltersContainer"

export const SearchAndFilters = () => {
  return (
    <div className="flex gap-4">
      {/* 검색 */}
      <SearchInput />
      {/* 필터 컨테이너 */}
      <FiltersContainer />
    </div>
  )
}
