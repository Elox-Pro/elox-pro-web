import { TfaType } from "../../../tfa/enums/validate-tfa/tfa-type.enum"

export type UpdateTfaRequest = {
    tfaType: TfaType
}