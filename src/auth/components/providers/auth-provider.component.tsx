import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { User } from "../../types/user.type"

type AuthContextProps = {
  user: User | null
  login: (user: User) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = localStorage.getItem("user")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const login = async (data: User): Promise<void> => {
    setUser(data)
    localStorage.setItem("user", JSON.stringify(data))
  }

  const logout = (): void => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
