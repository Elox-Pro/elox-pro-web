import Cookies from "js-cookie"
import ActiveUserStore from "./active-user-store.strategy"
import { ActiveUser } from "../types/active-user.type"

const ACTIVE_USER_KEY = "ZWxveC1wcm8tYWN0aXZlLXVzZXI"

export default class ActiveUserInCookie implements ActiveUserStore {
    constructor(private activeUserInitState: ActiveUser) {
    }
    get(): ActiveUser {
        const activeUser = Cookies.get(ACTIVE_USER_KEY)
        if (!activeUser) return this.activeUserInitState
        return JSON.parse(atob(activeUser))
    }

}
