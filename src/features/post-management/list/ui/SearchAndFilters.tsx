import { SearchInput } from "./SearchInput"
import { FiltersContainer } from "./FiltersContainer"

interface SearchAndFiltersProps {
  isLoading?: boolean
  onSearchSubmit?: () => void
}

export const SearchAndFilters = ({ isLoading = false, onSearchSubmit }: SearchAndFiltersProps) => {
  return (
    <div className="flex gap-4">
      <SearchInput onSearchSubmit={onSearchSubmit} />
      <FiltersContainer disabled={isLoading} />
    </div>
  )
}
