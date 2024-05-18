import Cookies from "js-cookie"
import { ActiveUser } from "../types/active-user.type"
import { Session } from "../types/session.type"
const ACTIVE_USER_KEY = "ZWxveC1wcm8tYWN0aXZlLXVzZXI"

/**
 * The cookies is used for keep the session available in the server and get the active user
 * when the user is authenticated or the page is refreshed
 * @returns ActiveUser | null
 */
export const getSession = (): Session => {
    return {
        activeUser: getActiveUser()
    } as Session
}

function getActiveUser(): ActiveUser | null {
    const activeUser = Cookies.get(ACTIVE_USER_KEY)
    if (!activeUser) {
        return null
    }
    return JSON.parse(atob(activeUser))
}