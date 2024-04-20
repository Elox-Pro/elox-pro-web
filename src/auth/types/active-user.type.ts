export type ActiveUser = {
    /**
     * The subject is the unique identifier of the user (username).
     */
    username: string

    role: string

    isAuthenticated: boolean
}