import { ActiveUser } from "../types/active-user.type"

export default interface ActiveUserStore {
    get(): ActiveUser
}