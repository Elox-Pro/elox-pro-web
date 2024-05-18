export type RecoverPasswordResetRequest = {
    username: string,
    password1: string,
    password2: string,
    grecaptchaToken?: string
}