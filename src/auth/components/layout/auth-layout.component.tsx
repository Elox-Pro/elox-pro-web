import AuthHeader from "../header/auth-header.component"
import { Outlet } from "react-router-dom"
export default function AuthLayout() {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>
  )
}
