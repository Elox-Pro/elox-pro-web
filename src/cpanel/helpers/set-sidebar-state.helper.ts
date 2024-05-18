import { CP_SIDEBAR_KEY } from "../constants/cp.constants";

export function setSidebarState(state: boolean) {
    localStorage.setItem(CP_SIDEBAR_KEY, state.toString())
}