import { useAuth } from "../providers/auth.provider"
import { ActiveUser } from "../types/active-user.type"

export default function useActiveUser(): ActiveUser | null {
    const authContext = useAuth();
    return authContext && authContext.activeUser;
}