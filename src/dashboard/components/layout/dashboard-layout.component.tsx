import { Outlet } from "react-router-dom"
import DashboardSidebar from "../sidebar/dashboard-sidebar.component"
import DashboardHeader from "../header/dashboard-header.component"

export default function DashboardLayout() {
  return (
    <>
      <DashboardHeader />
      <DashboardSidebar>
        <Outlet />
      </DashboardSidebar>
    </>
  )
}
