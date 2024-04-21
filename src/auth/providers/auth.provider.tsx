import { createContext, ReactNode, useMemo, useState } from "react"
import { ActiveUser } from "../types/active-user.type"
import ActiveUserStore from "../strategies/active-user-store.strategy"
import ActiveUserInCookie from "../strategies/active-user-in-cookie.strategy"
import { useLogoutRequestMutation } from "../api/auth.api"
import { showGRecaptcha } from "../../common/helpers/show-grecaptcha.helper"
import { useDispatch } from "react-redux"
import { deleteSession } from "../features/auth.slice"

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
  username: "",
  role: "",
  isAuthenticated: false,
}

const authContextInitState: AuthContextProps = {
  activeUser: activeUserInitState,
  createSession: () => { },
  logout: () => { },
  resetActiveUser: () => { },
}

export const AuthContext = createContext<AuthContextProps>(authContextInitState)

export default function AuthProvider({ children }: AuthProviderProps) {
  // console.log(0,"auth provider props")
  const activeUserStore: ActiveUserStore = new ActiveUserInCookie(activeUserInitState)
  const [activeUser, setActiveUser] = useState<ActiveUser>(activeUserStore.get())
  const [logoutRequest] = useLogoutRequestMutation()
  const dispatch = useDispatch()

  
  const createSession = (): void => {
    showGRecaptcha(false)
    setActiveUser(activeUserStore.get())
  }

  const logout = (): void => {
    dispatch(deleteSession())
    logoutRequest()
    resetActiveUser()
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
