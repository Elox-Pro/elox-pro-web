import { User } from "../../users/types/user.type"

export type ProfileState = {
    profile: User,
    profileTranslations: Record<string, string>
}