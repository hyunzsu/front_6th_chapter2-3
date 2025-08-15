import { useCallback } from "react"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../../shared/ui/button"
import { Comment } from "../../../../entities/comment/types"
import { useCommentsQuery } from "../../../../entities/comment/api"
import { useLikeComment } from "../../interactions/api"
import { useDeleteComment } from "../../update/api"
import { useModal } from "../../../../shared/hooks/useModal"
import { CommentFormDialog } from "./CommentFormDialog"

interface CommentControlPanelProps {
  comment: Comment
}

export const CommentControlPanel = ({ comment }: CommentControlPanelProps) => {
  const { mutate: likeComment } = useLikeComment()
  const { mutate: deleteComment } = useDeleteComment()
  const { data: commentsData } = useCommentsQuery(comment.postId)

  const {
    isModalOpen: isEditModalOpen,
    handleModalOpen: handleEditModalOpen,
    handleModalClose: handleEditModalClose,
  } = useModal()

  // 좋아요 핸들러
  const handleLike = useCallback(() => {
    const currentComment = commentsData?.comments?.find((c: Comment) => c.id === comment.id)
    if (!currentComment) return

    likeComment(
      { id: comment.id, likes: currentComment.likes + 1, postId: comment.postId },
      {
        onError: (error) => {
          console.error("댓글 좋아요 오류:", error)
        },
      },
    )
  }, [likeComment, comment.id, comment.postId, commentsData])

  // 삭제 핸들러
  const handleDelete = useCallback(() => {
    deleteComment(
      { id: comment.id, postId: comment.postId },
      {
        onError: (error) => {
          console.error("댓글 삭제 오류:", error)
        },
      },
    )
  }, [deleteComment, comment.id, comment.postId])

  return (
    <>
      {/* 댓글 수정 모달 */}
      {isEditModalOpen && (
        <CommentFormDialog mode="update" isOpen={isEditModalOpen} onClose={handleEditModalClose} comment={comment} />
      )}

      <div className="flex items-center space-x-1">
        {/* 좋아요 버튼 */}
        <Button variant="ghost" size="sm" onClick={handleLike}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>

        {/* 수정 버튼 */}
        <Button variant="ghost" size="sm" onClick={handleEditModalOpen}>
          <Edit2 className="w-3 h-3" />
        </Button>

        {/* 삭제 버튼 */}
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </>
  )
}
