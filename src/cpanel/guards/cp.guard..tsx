import { ReactNode } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { getActiveUserFromCookie } from "../../auth/features/auth.slice";

type CPGuardProps = {
  children: ReactNode
}
export default function CPGuard({ children }: CPGuardProps) {
  const activeUser = getActiveUserFromCookie();
  if (activeUser === null) {
    return <Navigate to="/error/401" replace />
  }
  return children ? children : <Outlet />
}

