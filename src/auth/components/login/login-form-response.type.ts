import { LoginFormTokens } from "./login-form-tokens.type"
export type LoginFormResponse = {
    isTFAPending: boolean,
    tokens: LoginFormTokens
}