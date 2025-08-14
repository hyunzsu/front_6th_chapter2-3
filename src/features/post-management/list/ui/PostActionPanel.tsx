import { useCallback } from "react"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Button } from "../../../../shared/ui/button"
import { PostWithAuthor } from "../../../../entities/post/types"
import { useDeletePost } from "../../update/api"
import { useModal } from "../../../../shared/hooks/useModal"
import { PostFormDialog, PostDetailDialog } from "../../shared/ui"

interface PostActionPanelProps {
  post: PostWithAuthor
}

export const PostActionPanel = ({ post }: PostActionPanelProps) => {
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

  const { mutate: deletePost } = useDeletePost()

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

      {/* 수정 모달 */}
      <PostFormDialog mode="update" isOpen={isEditModalOpen} onClose={handleEditModalClose} post={post} />

      {/* 상세보기 모달 */}
      <PostDetailDialog isOpen={isDetailModalOpen} onClose={handleDetailModalClose} post={post} />
    </>
  )
}
