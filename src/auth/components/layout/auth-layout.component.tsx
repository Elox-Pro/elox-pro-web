import AuthNav from "../nav/auth-nav.component"
import { Outlet } from "react-router-dom"
export default function AuthLayout() {
  return (
    <>
      <AuthNav />
      <Outlet />
    </>
  )
}
