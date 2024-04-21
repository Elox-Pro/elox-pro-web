import { useAppSelector } from "../../app/hooks/app.hooks";
import { getActiveUserFromCookie } from "../features/auth.slice";
import { ActiveUser2 } from "../types/active-user-2.type";

export function useActiveUser(): ActiveUser2 {
    // const activeUser = getActiveUserFromCookie();
    // console.log("activeUser-2 from cookies", activeUser);
    return useAppSelector(state => state.auth.activeUser);
}