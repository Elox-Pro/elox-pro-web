import { ReactNode, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../providers/auth-provider.component"

type ProtectedRouteProps = {
  children: ReactNode
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const authContext = useAuth()
  useEffect(() => {
    if (authContext === null || authContext.user === null) {
      navigate("/auth", { replace: true })
    }
  }, [])
  return children ? children : <Outlet />
}
