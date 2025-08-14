import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui/dialog"
import { Textarea } from "../../../../shared/ui/textarea"
import { Button } from "../../../../shared/ui/button"
import { Comment } from "../../../../entities/comment/types"

interface CommentFormDialogProps {
  mode: "create" | "update"
  isOpen: boolean
  onClose: () => void
  comment?: Comment | null
  postId?: number
  onSubmit: (data: { body: string; postId?: number; commentId?: number }) => void
}

export const CommentFormDialog = ({ mode, isOpen, onClose, comment, postId, onSubmit }: CommentFormDialogProps) => {
  const [body, setBody] = useState("")

  // 모드나 comment가 변경될 때 body 초기화
  useEffect(() => {
    if (mode === "update" && comment) {
      setBody(comment.body)
    } else {
      setBody("")
    }
  }, [mode, comment, isOpen])

  const handleSubmit = () => {
    if (!body.trim()) return

    const submitData = {
      body: body.trim(),
      ...(mode === "create" && { postId }),
      ...(mode === "update" && comment && { commentId: comment.id }),
    }

    onSubmit(submitData)
    handleClose()
  }

  const handleClose = () => {
    setBody("")
    onClose()
  }

  const title = mode === "create" ? "새 댓글 추가" : "댓글 수정"
  const submitText = mode === "create" ? "댓글 추가" : "댓글 업데이트"

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={!body.trim()}>
              {submitText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
