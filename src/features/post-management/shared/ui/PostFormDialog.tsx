import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui/dialog"
import { Input } from "../../../../shared/ui/input"
import { Textarea } from "../../../../shared/ui/textarea"
import { Button } from "../../../../shared/ui/button"
import { PostWithAuthor } from "../../../../entities/post/types"
import { useCreatePost } from "../../create/api"
import { useUpdatePost } from "../../update/api"

interface PostFormDialogProps {
  mode: "create" | "update"
  isOpen: boolean
  onClose: () => void
  post?: PostWithAuthor | null
}

export const PostFormDialog = ({ mode, isOpen, onClose, post }: PostFormDialogProps) => {
  const { mutate: createPost } = useCreatePost()
  const { mutate: updatePost } = useUpdatePost()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [userId, setUserId] = useState(1)

  // 모드나 post가 변경될 때 폼 초기화
  useEffect(() => {
    if (mode === "update" && post) {
      setTitle(post.title)
      setBody(post.body)
      setUserId(post.userId)
    } else {
      setTitle("")
      setBody("")
      setUserId(1)
    }
  }, [mode, post, isOpen])

  // 게시물 생성 핸들러
  const handleCreate = useCallback(() => {
    createPost(
      {
        title: title.trim(),
        body: body.trim(),
        userId,
      },
      {
        onSuccess: () => {
          handleClose()
        },
        onError: (error) => {
          console.error("게시물 생성 오류:", error)
        },
      },
    )
  }, [createPost, title, body, userId])

  // 게시물 수정 핸들러
  const handleUpdate = useCallback(() => {
    if (!post) return

    updatePost(
      {
        id: post.id,
        data: {
          title: title.trim(),
          body: body.trim(),
        },
      },
      {
        onSuccess: () => {
          handleClose()
        },
        onError: (error) => {
          console.error("게시물 수정 오류:", error)
        },
      },
    )
  }, [updatePost, post, title, body])

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return

    if (mode === "create") {
      handleCreate()
    } else if (mode === "update") {
      handleUpdate()
    }
  }

  const handleClose = () => {
    setTitle("")
    setBody("")
    setUserId(1)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "새 게시물 추가" : "게시물 수정"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea
            rows={mode === "create" ? 30 : 15}
            placeholder="내용"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {mode === "create" && (
            <Input
              type="number"
              placeholder="사용자 ID"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
            />
          )}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={!title.trim() || !body.trim()}>
              {mode === "create" ? "게시물 추가" : "게시물 업데이트"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
