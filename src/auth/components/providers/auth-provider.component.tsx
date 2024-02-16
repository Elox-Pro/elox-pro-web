import { createContext, ReactNode, useContext, useMemo } from "react"
import { useLocalStorage } from "usehooks-ts"
import { User } from "../../types/user.type"
import { useNavigate } from "react-router-dom"

type AuthContextProps = {
  user: User | null
  login: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>("user", null)
  const navigate = useNavigate()

  const login = async (data: User): Promise<void> => {
    setUser(data)
    navigate("/dashboard/home", { replace: true })
  }

  const logout = (): void => {
    setUser(null)
    navigate("/auth", { replace: true })
  }

  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
