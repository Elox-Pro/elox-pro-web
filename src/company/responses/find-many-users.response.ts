import { User } from "../../users/types/user.type"

export type FindManyUsersResponse = {
    users: User[]
    total: number
}