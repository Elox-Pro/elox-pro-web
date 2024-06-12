import { ModalState } from "../../common/types/modal-state.type"
import { User } from "./user.type"

export type SelectUserState = {
    modal: ModalState
    users: User[]
    total: number,
    selectedUser: User | null
}