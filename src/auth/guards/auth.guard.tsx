import { ReactNode } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { getActiveUserFromCookie } from "../features/auth.slice"

type AuthGuardProps = {
  children: ReactNode
}
export default function AuthGuard({ children }: AuthGuardProps) {

  const activeUser = getActiveUserFromCookie();
  if (activeUser !== null) {
    return <Navigate to="/cpanel/dashboard/" replace />;
  }
  return children ? children : <Outlet />
}
