import { JWTData } from "../jwt-data.type"
export type LoginResponse = {
    isTFAPending: boolean,
    tokens: JWTData
}