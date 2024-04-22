import Cookies from "js-cookie"
import { ActiveUser } from "../types/active-user.type"
const ACTIVE_USER_KEY = "ZWxveC1wcm8tYWN0aXZlLXVzZXI"

export const getActiveUserFromCookies = (): ActiveUser | null => {
    const activeUser = Cookies.get(ACTIVE_USER_KEY)
    if (!activeUser) {
        return null
    }
    return JSON.parse(atob(activeUser))
}
