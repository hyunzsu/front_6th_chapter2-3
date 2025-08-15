import { useAtom } from "jotai"
import { Search } from "lucide-react"
import { Input } from "../../../../shared/ui/input"
import { postsSearchQueryAtom, setPostsPageAtom } from "../model"

interface SearchInputProps {
  onSearchSubmit?: () => void
}

export const SearchInput = ({ onSearchSubmit }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useAtom(postsSearchQueryAtom)
  const [, setPage] = useAtom(setPostsPageAtom)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleSearchSubmit = () => {
    setPage(1) // 검색 시 첫 페이지로
    onSearchSubmit?.()
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
        />
      </div>
    </div>
  )
}
