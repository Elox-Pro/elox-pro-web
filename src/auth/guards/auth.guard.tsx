import { ReactNode, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../providers/auth.provider"

type AuthGuardProps = {
  children: ReactNode
}
export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate()
  const authContext = useAuth()
  const isAuthenticated = authContext?.activeUser !== null

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/home", { replace: true })
    }
  }, [isAuthenticated])

  return children ? children : <Outlet />
}
