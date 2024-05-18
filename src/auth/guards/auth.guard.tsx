import { ReactNode } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { getSession } from "../helpers/get-session.helper";

type AuthGuardProps = {
  children: ReactNode
}
export default function AuthGuard({ children }: AuthGuardProps) {

  const { activeUser } = getSession();
  if (activeUser !== null && activeUser.isAuthenticated) {
    return <Navigate to="/cpanel/dashboard/" replace />;
  }
  return children || <Outlet />
}
