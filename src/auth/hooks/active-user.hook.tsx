import { useAppSelector } from "../../app/hooks/app.hooks";
import { ActiveUser } from "../types/active-user.type";

export function useActiveUser(): ActiveUser {
    return useAppSelector(state => state.auth.activeUser);
}