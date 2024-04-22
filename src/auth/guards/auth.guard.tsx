import { ReactNode } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { getActiveUserFromCookies } from "../helpers/get-active-user-from-cookies.helper";

type AuthGuardProps = {
  children: ReactNode
}
export default function AuthGuard({ children }: AuthGuardProps) {

  const activeUser = getActiveUserFromCookies();
  if (activeUser !== null && activeUser.isAuthenticated) {
    return <Navigate to="/cpanel/dashboard/" replace />;
  }
  return children || <Outlet />
}
