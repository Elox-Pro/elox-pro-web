import { DEFAULT_AVATAR_URL } from "../constants/profile.constants";

export function getProfileAvatar(avatarUrl: string | undefined) {
    return avatarUrl || DEFAULT_AVATAR_URL;
}