import { User } from "../../users/types/user.type"

export type ProfileState = {
    profile: User | null,
    profileTranslations: Record<string, string> | null
}