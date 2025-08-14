import { Plus } from "lucide-react"
import { Button } from "../../../../shared/ui/button"
import { Comment } from "../../../../entities/comment/types"
import { CommentItem } from "./CommentItem"

interface CommentListProps {
  comments: Comment[]
  postId: number
  searchQuery?: string
  onAddComment: (postId: number) => void
  onLikeComment: (commentId: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number, postId: number) => void
}

export const CommentList = ({
  comments,
  postId,
  searchQuery = "",
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}: CommentListProps) => {
  return (
    <div className="mt-2">
      {/* 댓글 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => onAddComment(postId)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-1">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-4">댓글이 없습니다.</div>
        ) : (
          comments.map((comment: Comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              searchQuery={searchQuery}
              onLike={onLikeComment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
            />
          ))
        )}
      </div>
    </div>
  )
}
