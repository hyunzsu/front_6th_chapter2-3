import { Plus } from "lucide-react"
import { Button } from "../../../../shared/ui/button"
import { CardHeader, CardTitle } from "../../../../shared/ui/card"
import { useModal } from "../../../../shared/hooks"
import { PostFormDialog } from "../../shared/ui"

export const CreateButton = () => {
  const {
    isModalOpen: isAddPostModalOpen,
    handleModalOpen: handleAddPostModalOpen,
    handleModalClose: handleAddPostModalClose,
  } = useModal()

  return (
    <>
      {isAddPostModalOpen && (
        <PostFormDialog mode="create" isOpen={isAddPostModalOpen} onClose={handleAddPostModalClose} />
      )}

      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={handleAddPostModalOpen}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
    </>
  )
}
