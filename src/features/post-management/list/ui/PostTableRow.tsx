import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useAtom, useAtomValue } from "jotai"
import { TableCell, TableRow } from "../../../../shared/ui/table"
import { PostWithAuthor } from "../../../../entities/post/types"
import { postsSearchQueryAtom, postsSelectedTagAtom } from "../model"
import { useModal } from "../../../../shared/hooks/useModal"
import { UserInfoDialog } from "../../../user-profile/ui/UserInfoDialog"
import { PostControlPanel } from "./PostControlPanel"
import { splitTextForHighlight } from "../../../../shared/lib"

interface PostTableRowProps {
  post: PostWithAuthor
}

export const PostTableRow = ({ post }: PostTableRowProps) => {
  const searchQuery = useAtomValue(postsSearchQueryAtom)
  const selectedTag = useAtomValue(postsSelectedTagAtom)
  const [, setSelectedTag] = useAtom(postsSelectedTagAtom)

  const {
    isModalOpen: isUserModalOpen,
    handleModalOpen: handleUserModalOpen,
    handleModalClose: handleUserModalClose,
  } = useModal()

  const renderHighlightedText = (text: string, query: string) => {
    const { parts, isMatch } = splitTextForHighlight(text, query)
    return <span>{parts.map((part, i) => (isMatch(part) ? <mark key={i}>{part}</mark> : part))}</span>
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }

  const handleUserClick = () => {
    handleUserModalOpen()
  }

  return (
    <>
      {/* 사용자 모달 */}
      {isUserModalOpen && (
        <UserInfoDialog isOpen={isUserModalOpen} onClose={handleUserModalClose} userId={post.author?.id || null} />
      )}

      <TableRow key={post.id}>
        {/* ID */}
        <TableCell>{post.id}</TableCell>

        {/* 제목 & 태그 */}
        <TableCell>
          <div className="space-y-1">
            <div>{renderHighlightedText(post.title, searchQuery)}</div>
            <div className="flex flex-wrap gap-1">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                    selectedTag === tag
                      ? "text-white bg-blue-500 hover:bg-blue-600"
                      : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </TableCell>

        {/* 작성자 */}
        <TableCell>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleUserClick}>
            <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
            <span>{post.author?.username}</span>
          </div>
        </TableCell>

        {/* 반응 */}
        <TableCell>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" />
            <span>{post.reactions?.likes || 0}</span>
            <ThumbsDown className="w-4 h-4" />
            <span>{post.reactions?.dislikes || 0}</span>
          </div>
        </TableCell>

        {/* 액션 버튼들 */}
        <TableCell>
          <PostControlPanel post={post} />
        </TableCell>
      </TableRow>
    </>
  )
}
