import { TfaAction } from "../../../tfa/enums/validate-tfa/tfa-action.enum"
import { TfaType } from "../../../tfa/enums/validate-tfa/tfa-type.enum"
import { JWTData } from "../../../auth/types/jwt-data.type"

export type ValidateTfaResponse = {
    type: TfaType,
    action: TfaAction,
    tokens?: JWTData,
}