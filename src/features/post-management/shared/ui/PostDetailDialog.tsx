import { useAtomValue } from "jotai"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui/dialog"
import { PostWithAuthor } from "../../../../entities/post/types"
import { postsSearchQueryAtom } from "../../list/model"
import { CommentList } from "../../../comment-management/list/ui"

interface PostDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  post: PostWithAuthor | null
}

export const PostDetailDialog = ({ isOpen, onClose, post }: PostDetailDialogProps) => {
  const searchQuery = useAtomValue(postsSearchQueryAtom)

  // 하이라이트 함수
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>

          {/* 댓글 위젯 */}
          <CommentList postId={post.id} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
