import { ReactNode, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../providers/auth-provider.component"

type ProtectedRouteProps = {
  children: ReactNode
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const authContext = useAuth()
  const isAuthenticated = authContext?.activeUser !== null

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { replace: true })
    }
  }, [isAuthenticated])

  return children ? children : <Outlet />
}
