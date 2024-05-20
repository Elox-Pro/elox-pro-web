import { User } from "../../users/types/user.type"

export type Company = {
    name: string
    imageUrl: string
    users: User[]
}