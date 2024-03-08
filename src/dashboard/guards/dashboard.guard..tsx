import { ReactNode, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/providers/auth.provider"

type DashboardGuardProps = {
  children: ReactNode
}
export default function DashboardGuard({ children }: DashboardGuardProps) {
  const navigate = useNavigate()
  const authContext = useAuth()
  const isAuthenticated = authContext.activeUser.isAuthenticated

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/", { replace: true })
    }
  }, [isAuthenticated])

  return children ? children : <Outlet />
}
