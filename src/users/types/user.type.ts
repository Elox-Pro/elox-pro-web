export type User = {

    updatedAt: Date
    createdAt: Date

    role: string
    username: string
    email: string
    firstName: string
    lastName: string
    phone: string

    gender: string

    avatarUrl: string

    // Flat indication email verification status
    emailVerified: boolean

    // Flag indicating phone verification status
    phoneVerified: boolean

    // The TFA authentication type to 
    tfaType: string

    // Last login timestamp
    lastLoginAt: Date

    // The user language
    lang: string

    // The UI user theme
    theme: string
}