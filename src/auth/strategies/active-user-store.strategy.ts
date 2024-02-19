import { ActiveUser } from "../types/active-user.type"

export default interface ActiveUserStore {
    set(activeUser: ActiveUser, ttl: number): void
    get(): ActiveUser | null
    remove(): void
}