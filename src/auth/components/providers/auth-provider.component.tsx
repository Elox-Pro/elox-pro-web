import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { ActiveUser } from "../../types/active-user.type"
import ActiveUserStore from "../../strategies/active-user-store.strategy"
import ActiveUserInCookie from "../../strategies/active-user-in-cookie.strategy"

type AuthContextProps = {
  activeUser: ActiveUser | null
  createSession: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const activeUserStore: ActiveUserStore = new ActiveUserInCookie()
  const [activeUser, setActiveUser] = useState<ActiveUser | null>(activeUserStore.get())

  const createSession = (): void => {
    setActiveUser(activeUserStore.get())
  }

  const logout = (): void => {
    activeUserStore.remove()
    setActiveUser(null)
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
