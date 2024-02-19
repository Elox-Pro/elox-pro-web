import Cookies from "js-cookie"
import ActiveUserStore from "./active-user-store.strategy"
import { ActiveUser } from "../types/active-user.type"

const ACTIVE_USER_KEY = "ZWxveC1wcm8tYWN0aXZlLXVzZXI="
const DOMAIN = ".eloxpro.com"//TODO: Brings from env file

export default class ActiveUserInCookie implements ActiveUserStore {
    set(activeUser: ActiveUser, ttl: number): void {
        Cookies.set(ACTIVE_USER_KEY, btoa(JSON.stringify(activeUser)), {
            // secure: true,
            domain: DOMAIN,
            expires: new Date(Date.now() + ttl * 1000),
        })
    }

    get(): ActiveUser | null {
        const activeUser = Cookies.get(ACTIVE_USER_KEY)
        if (!activeUser) return null
        return JSON.parse(atob(activeUser))
    }

    remove(): void {
        Cookies.remove(ACTIVE_USER_KEY)
    }
}
