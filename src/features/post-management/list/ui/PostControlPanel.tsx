import { useCallback } from "react"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Button } from "../../../../shared/ui/button"
import { PostWithAuthor } from "../../../../entities/post/types"
import { useDeletePost } from "../../update/api"
import { useModal } from "../../../../shared/hooks/useModal"
import { PostFormDialog, PostDetailDialog } from "../../shared/ui"

interface PostControlPanelProps {
  post: PostWithAuthor
}

export const PostControlPanel = ({ post }: PostControlPanelProps) => {
  const { mutate: deletePost } = useDeletePost()

  const {
    isModalOpen: isEditModalOpen,
    handleModalOpen: handleEditModalOpen,
    handleModalClose: handleEditModalClose,
  } = useModal()

  const {
    isModalOpen: isDetailModalOpen,
    handleModalOpen: handleDetailModalOpen,
    handleModalClose: handleDetailModalClose,
  } = useModal()

  // 삭제 핸들러
  const handleDelete = useCallback(() => {
    deletePost(
      { id: post.id },
      {
        onError: (error) => {
          console.error("게시물 삭제 오류:", error)
        },
      },
    )
  }, [deletePost, post.id])

  return (
    <>
      {/* 게시물 수정 모달 */}
      {isEditModalOpen && (
        <PostFormDialog mode="update" isOpen={isEditModalOpen} onClose={handleEditModalClose} post={post} />
      )}

      {/* 게시물 상세보기 모달 */}
      {isDetailModalOpen && (
        <PostDetailDialog isOpen={isDetailModalOpen} onClose={handleDetailModalClose} post={post} />
      )}

      <div className="flex items-center gap-2">
        {/* 댓글 보기 버튼 */}
        <Button variant="ghost" size="sm" onClick={handleDetailModalOpen}>
          <MessageSquare className="w-4 h-4" />
        </Button>

        {/* 수정 버튼 */}
        <Button variant="ghost" size="sm" onClick={handleEditModalOpen}>
          <Edit2 className="w-4 h-4" />
        </Button>

        {/* 삭제 버튼 */}
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}
