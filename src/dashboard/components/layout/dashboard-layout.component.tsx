import { Outlet } from "react-router-dom"
import DashboardHeader from "../header/dashboard-header.component"

export default function DashboardLayout() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  )
}
