import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { ActiveUser } from "../types/active-user.type"
import ActiveUserStore from "../strategies/active-user-store.strategy"
import ActiveUserInCookie from "../strategies/active-user-in-cookie.strategy"
import { useLogoutRequestMutation } from "../api/auth.api"
import { showGRecaptcha } from "../../common/helpers/show-grecaptcha.helper"

type AuthContextProps = {
  activeUser: ActiveUser
  createSession: () => void
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

const activeUserInitState: ActiveUser = {
  sub: "",
  role: "",
  isAuthenticated: false,
}

const authContextInitState: AuthContextProps = {
  activeUser: activeUserInitState,
  createSession: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(authContextInitState)

export default function AuthProvider({ children }: AuthProviderProps) {
  const activeUserStore: ActiveUserStore = new ActiveUserInCookie(activeUserInitState)
  const [activeUser, setActiveUser] = useState<ActiveUser>(activeUserStore.get())
  const [logoutRequest] = useLogoutRequestMutation()

  const createSession = (): void => {
    showGRecaptcha(false)
    setActiveUser(activeUserStore.get())
  }

  const logout = (): void => {
    logoutRequest()
    setActiveUser(activeUserInitState)
  }

  const value = useMemo(
    () => ({
      activeUser,
      createSession,
      logout,
    }),
    [activeUser, createSession, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
