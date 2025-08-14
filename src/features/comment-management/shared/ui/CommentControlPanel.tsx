import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../../shared/ui/button"
import { Comment } from "../../../../entities/comment/types"

interface CommentControlPanelProps {
  comment: Comment
  onLike: (commentId: number, postId: number) => void
  onEdit: (comment: Comment) => void
  onDelete: (commentId: number, postId: number) => void
}

export const CommentControlPanel = ({ comment, onLike, onEdit, onDelete }: CommentControlPanelProps) => {
  return (
    <div className="flex items-center space-x-1">
      {/* 좋아요 버튼 */}
      <Button variant="ghost" size="sm" onClick={() => onLike(comment.id, comment.postId)}>
        <ThumbsUp className="w-3 h-3" />
        <span className="ml-1 text-xs">{comment.likes}</span>
      </Button>

      {/* 수정 버튼 */}
      <Button variant="ghost" size="sm" onClick={() => onEdit(comment)}>
        <Edit2 className="w-3 h-3" />
      </Button>

      {/* 삭제 버튼 */}
      <Button variant="ghost" size="sm" onClick={() => onDelete(comment.id, comment.postId)}>
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  )
}
