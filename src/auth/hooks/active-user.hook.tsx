import { useAppSelector } from "../../app/hooks/app.hooks";
import { ActiveUser2 } from "../types/active-user-2.type";

export function useActiveUser(): ActiveUser2 {
    return useAppSelector(state => state.auth.activeUser);
}