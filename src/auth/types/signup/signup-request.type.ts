export type SignupRequest = {
    username: string
    email: string
    password1: string
    password2: string
    grecaptchaToken?: string
}