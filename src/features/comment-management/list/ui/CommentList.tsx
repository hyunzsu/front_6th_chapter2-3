import { Plus } from "lucide-react"
import { Button } from "../../../../shared/ui/button"
import { Comment } from "../../../../entities/comment/types"
import { useCommentsQuery } from "../../../../entities/comment/api"
import { useModal } from "../../../../shared/hooks/useModal" // 직접 import
import { CommentItem } from "./CommentItem"
import { CommentFormDialog } from "../../shared/ui"

interface CommentListProps {
  postId: number
  searchQuery?: string
}

export const CommentList = ({ postId, searchQuery = "" }: CommentListProps) => {
  const { data: commentsData } = useCommentsQuery(postId)

  const {
    isModalOpen: isCreateModalOpen,
    handleModalOpen: handleCreateModalOpen,
    handleModalClose: handleCreateModalClose,
  } = useModal()

  return (
    <>
      {/* 댓글 추가 모달 */}
      {isCreateModalOpen && (
        <CommentFormDialog mode="create" isOpen={isCreateModalOpen} onClose={handleCreateModalClose} postId={postId} />
      )}

      <div className="mt-2">
        {/* 댓글 헤더 */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <Button size="sm" onClick={handleCreateModalOpen}>
            <Plus className="w-3 h-3 mr-1" />
            댓글 추가
          </Button>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-1">
          {commentsData?.comments.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-4">댓글이 없습니다.</div>
          ) : (
            commentsData?.comments.map((comment: Comment) => (
              <CommentItem key={comment.id} comment={comment} searchQuery={searchQuery} />
            ))
          )}
        </div>
      </div>
    </>
  )
}
