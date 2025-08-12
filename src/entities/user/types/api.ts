import { User } from "./user"
import { PaginationResponse } from "../../../shared/types"

// API 응답 타입
export interface UsersResponse extends PaginationResponse<User> {
  users: User[]
}
