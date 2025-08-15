import { useAtom, useAtomValue } from "jotai"
import { Button } from "../../../../shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/ui/select"
import { postsLimitAtom, postsSkipAtom, postsPageAtom, setPostsPageAtom, setPostsLimitAtom } from "../model"

interface PaginationControlsProps {
  total: number
}

export const PaginationControls = ({ total }: PaginationControlsProps) => {
  const limit = useAtomValue(postsLimitAtom)
  const skip = useAtomValue(postsSkipAtom)
  const page = useAtomValue(postsPageAtom)
  const [, setPage] = useAtom(setPostsPageAtom)
  const [, setLimit] = useAtom(setPostsLimitAtom)

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    if (skip + limit < total) {
      setPage(page + 1)
    }
  }

  const handleLimitChange = (value: string) => {
    setLimit(Number(value))
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={page === 1} onClick={handlePrevious}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
