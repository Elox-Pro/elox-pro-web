import { ActiveUser } from "../types/active-user.type"

export default interface ActiveUserStore {
    set(activeUser: ActiveUser): void
    get(): ActiveUser | null
    remove(): void
}