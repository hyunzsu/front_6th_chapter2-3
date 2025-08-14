import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../../shared/ui/table"
import { PostWithAuthor } from "../../../../entities/post/types"
import { PostTableRow } from "./PostTableRow"

interface PostTableProps {
  posts: PostWithAuthor[]
  isLoading?: boolean
}

export const PostTable = ({ posts, isLoading = false }: PostTableProps) => {
  if (isLoading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post: PostWithAuthor) => (
          <PostTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}
