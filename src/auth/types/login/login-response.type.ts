import { TfaResponse } from "../../../common/types/tfa-response.type"
import { JWTData } from "../jwt-data.type"
export type LoginResponse = {
    tokens: JWTData
} & TfaResponse