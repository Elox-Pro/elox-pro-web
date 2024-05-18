import { CP_SIDEBAR_KEY } from "../constants/cp.constants";

export function getSidebarState() {
    const hidden = localStorage.getItem(CP_SIDEBAR_KEY)
    if (!hidden) {
        return false;
    }
    return hidden === "true"
}