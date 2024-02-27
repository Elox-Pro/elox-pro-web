import { ReactNode, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../../auth/components/providers/auth-provider.component"

type DashboardGuardProps = {
  children: ReactNode
}
export default function DashboardGuard({ children }: DashboardGuardProps) {
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
