import { ReactNode, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/hooks/auth.hook"

type CPGuardProps = {
  children: ReactNode
}
export default function CPGuard({ children }: CPGuardProps) {
  const navigate = useNavigate()
  const authContext = useAuth()
  const isAuthenticated = authContext.activeUser.isAuthenticated

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/signin/", { replace: true })
    }
  }, [isAuthenticated])

  return children ? children : <Outlet />
}
