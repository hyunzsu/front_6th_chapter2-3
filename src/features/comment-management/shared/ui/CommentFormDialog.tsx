import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui/dialog"
import { Textarea } from "../../../../shared/ui/textarea"
import { Button } from "../../../../shared/ui/button"
import { Comment } from "../../../../entities/comment/types"
import { useCreateComment } from "../../create/api"
import { useUpdateComment } from "../../update/api"

interface CommentFormDialogProps {
  mode: "create" | "update"
  isOpen: boolean
  onClose: () => void
  comment?: Comment | null
  postId?: number
}

export const CommentFormDialog = ({ mode, isOpen, onClose, comment, postId }: CommentFormDialogProps) => {
  const { mutate: createComment } = useCreateComment()
  const { mutate: updateComment } = useUpdateComment()

  const [body, setBody] = useState("")

  // 모드나 comment가 변경될 때 body 초기화
  useEffect(() => {
    if (mode === "update" && comment) {
      setBody(comment.body)
    } else {
      setBody("")
    }
  }, [mode, comment, isOpen])

  // 댓글 생성 핸들러
  const handleCreate = useCallback(
    (data: { body: string; postId: number }) => {
      createComment(
        {
          body: data.body,
          postId: data.postId,
          userId: 1, // TODO: 실제 사용자 ID
        },
        {
          onSuccess: () => {
            handleClose()
          },
          onError: (error) => {
            console.error("댓글 생성 오류:", error)
          },
        },
      )
    },
    [createComment],
  )

  // 댓글 수정 핸들러
  const handleUpdate = useCallback(
    (data: { commentId: number; body: string; postId: number }) => {
      updateComment(
        {
          id: data.commentId,
          data: { body: data.body },
          postId: data.postId,
        },
        {
          onSuccess: () => {
            handleClose()
          },
          onError: (error) => {
            console.error("댓글 수정 오류:", error)
          },
        },
      )
    },
    [updateComment],
  )

  const handleSubmit = () => {
    if (!body.trim()) return

    if (mode === "create" && postId) {
      handleCreate({ body: body.trim(), postId })
    } else if (mode === "update" && comment) {
      handleUpdate({
        commentId: comment.id,
        body: body.trim(),
        postId: comment.postId,
      })
    }
  }

  const handleClose = () => {
    setBody("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "새 댓글 추가" : "댓글 수정"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={!body.trim()}>
              {mode === "create" ? "댓글 추가" : "댓글 업데이트"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
