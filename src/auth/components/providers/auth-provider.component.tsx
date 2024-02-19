import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { ActiveUser } from "../../types/active-user.type"
import { LoginFormTokens } from "../login/login-form-tokens.type"
import { jwtDecode } from "jwt-decode"
import ActiveUserStore from "../../strategies/active-user-store.strategy"
import ActiveUserInCookie from "../../strategies/active-user-in-cookie.strategy"

type AuthContextProps = {
  activeUser: ActiveUser | null
  setLogin: (tokens: LoginFormTokens) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const activeUserStore: ActiveUserStore = new ActiveUserInCookie()
  const [activeUser, setActiveUser] = useState<ActiveUser | null>(activeUserStore.get())

  const setLogin = (tokens: LoginFormTokens): void => {
    const user = jwtDecode<ActiveUser>(tokens.accessToken)
    activeUserStore.set(user, tokens.refreshTokenTTL)
    setActiveUser(user)
  }

  const logout = (): void => {
    activeUserStore.remove()
    setActiveUser(null)
  }

  const value = useMemo(() => ({ activeUser, setLogin, logout }), [activeUser, setLogin, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
