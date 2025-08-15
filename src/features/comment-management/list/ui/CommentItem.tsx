import { Comment } from "../../../../entities/comment/types"
import { CommentControlPanel } from "../../shared/ui"
import { splitTextForHighlight } from "../../../../shared/lib/"

interface CommentItemProps {
  comment: Comment
  searchQuery?: string
}

export const CommentItem = ({ comment, searchQuery = "" }: CommentItemProps) => {
  const renderHighlightedText = (text: string, query: string) => {
    const { parts, isMatch } = splitTextForHighlight(text, query)
    return <span>{parts.map((part, i) => (isMatch(part) ? <mark key={i}>{part}</mark> : part))}</span>
  }

  console.log(comment.body)
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      {/* 댓글 내용 영역 */}
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{renderHighlightedText(comment.body, searchQuery)}</span>
      </div>

      {/* 액션 버튼들 */}
      <CommentControlPanel comment={comment} />
    </div>
  )
}
