import { User } from "../user.type";

export type GetUsersResponse = {
    users: User[]
    total: number
}