import { ModalState } from "../../common/types/modal-state.type"
import { User } from "../../users/types/user.type"
import { Company } from "./company.type"

export type ManageCompanyUserModalState = {
    modal: ModalState
    user: User | null,
    company: Company | null,
}