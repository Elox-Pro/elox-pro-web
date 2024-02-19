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
    console.log("authContext", authContext)
    console.log("authContext.user", authContext?.user)
    if (authContext === null || authContext.user === null) {
      navigate("/auth", { replace: true })
    }
  }, [])

  return children ? children : <Outlet />
}
