import { ReactNode } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../providers/auth-provider.component"

type ProtectedRouteProps = {
  children: ReactNode
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const data = useAuth()
  if (data === null || data.user === null) {
    navigate("/auth", { replace: true })
  }
  return children ? children : <Outlet />
}
