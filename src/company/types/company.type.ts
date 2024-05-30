import { User } from "../../users/types/user.type"

export type Company = {
    id: number,
    name: string
    imageUrl: string
    users: User[]
    updatedAt: Date
}