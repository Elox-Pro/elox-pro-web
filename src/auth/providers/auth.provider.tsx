import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { ActiveUser } from "../types/active-user.type"
import ActiveUserStore from "../strategies/active-user-store.strategy"
import ActiveUserInCookie from "../strategies/active-user-in-cookie.strategy"
import { useLogoutRequestMutation } from "../api/auth.api"
import { showGRecaptcha } from "../../common/helpers/show-grecaptcha.helper"
import { useDispatch } from "react-redux"
import { sidebarOffClose } from "../../cpanel/features/cp-sidebar-offcanvas.slice"

type AuthContextProps = {
  activeUser: ActiveUser
  createSession: () => void
  logout: () => void,
  resetActiveUser: () => void
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
  createSession: () => { },
  logout: () => { },
  resetActiveUser: () => { },
}

const AuthContext = createContext<AuthContextProps>(authContextInitState)

export default function AuthProvider({ children }: AuthProviderProps) {
  const activeUserStore: ActiveUserStore = new ActiveUserInCookie(activeUserInitState)
  const [activeUser, setActiveUser] = useState<ActiveUser>(activeUserStore.get())
  const [logoutRequest] = useLogoutRequestMutation()
  const dispatch = useDispatch()

  const createSession = (): void => {
    showGRecaptcha(false)
    setActiveUser(activeUserStore.get())
  }

  const logout = (): void => {
    logoutRequest()
    resetActiveUser()
    dispatch(sidebarOffClose())

  }

  const resetActiveUser = (): void => {
    setActiveUser(activeUserInitState)
  }

  const value = useMemo(
    () => ({
      activeUser,
      createSession,
      logout,
      resetActiveUser,
    }),
    [activeUser, createSession, logout, resetActiveUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
