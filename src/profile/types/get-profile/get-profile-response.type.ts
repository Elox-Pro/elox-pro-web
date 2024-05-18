import { User } from "../../../users/types/user.type"

export type GetProfileResponse = {
    user: User,
    userTranslations: Record<string, string>
}