export type ActiveUser = {
    username: string | null
    role: string | null
    avatarUrl: string | null
    exp: number
    isAuthenticated: boolean
}