import { TfaAction } from "../../enums/validate-tfa/tfa-action.enum"
import { TfaType } from "../../enums/validate-tfa/tfa-type.enum"
import { JWTData } from "../jwt-data.type"

export type ValidateTfaResponse = {
    type: TfaType,
    action: TfaAction,
    tokens?: JWTData,
}