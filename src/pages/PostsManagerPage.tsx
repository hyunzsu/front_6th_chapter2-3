import { useEffect } from "react"
import { useSetAtom } from "jotai"
import { resetPostsFiltersAtom } from "../features/post-management/list/model"
import { PostManagerList } from "../features/post-management/list/ui"
import { CreateButton } from "../features/post-management/create/ui"

const PostsManager = () => {
  const resetPostsFilters = useSetAtom(resetPostsFiltersAtom)

  useEffect(() => {
    return () => {
      resetPostsFilters()
    }
  }, [resetPostsFilters])

  return (
    <div className="flex flex-col gap-6 w-full min-h-full pt-6 pb-10">
      <h4 className="ml-7 text-lg font-semibold">게시물 관리</h4>
      <CreateButton />
      <PostManagerList />
    </div>
  )
}

export default PostsManager
