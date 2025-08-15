import { useAtomValue } from "jotai"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui/dialog"
import { PostWithAuthor } from "../../../../entities/post/types"
import { postsSearchQueryAtom } from "../../list/model"
import { CommentList } from "../../../comment-management/list/ui"
import { splitTextForHighlight } from "../../../../shared/lib"

interface PostDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  post: PostWithAuthor | null
}

export const PostDetailDialog = ({ isOpen, onClose, post }: PostDetailDialogProps) => {
  const searchQuery = useAtomValue(postsSearchQueryAtom)

  const renderHighlightedText = (text: string, query: string) => {
    const { parts, isMatch } = splitTextForHighlight(text, query)
    return <span>{parts.map((part, i) => (isMatch(part) ? <mark key={i}>{part}</mark> : part))}</span>
  }

  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{renderHighlightedText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{renderHighlightedText(post.body, searchQuery)}</p>

          {/* 댓글 위젯 */}
          <CommentList postId={post.id} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
