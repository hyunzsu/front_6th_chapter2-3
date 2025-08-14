import { Comment } from "../../../../entities/comment/types"
import { CommentControlPanel } from "../../shared/ui"

interface CommentItemProps {
  comment: Comment
  searchQuery?: string
}

// 하이라이트 함수
const highlightText = (text: string, highlight: string) => {
  if (!text) return null
  if (!highlight?.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
    </span>
  )
}

export const CommentItem = ({ comment, searchQuery = "" }: CommentItemProps) => {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      {/* 댓글 내용 영역 */}
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>

      {/* 액션 버튼들 */}
      <CommentControlPanel comment={comment} />
    </div>
  )
}
