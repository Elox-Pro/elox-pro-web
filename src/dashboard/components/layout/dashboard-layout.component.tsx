import { Outlet } from "react-router-dom"
import DashboardSidebar from "../sidebar/dashboard-sidebar.component"
import DashboardHeader from "../header/dashboard-header.component"
import DashboardMainPanel from "../main-panel/dashboard-main-panel.component"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import "./dashboard-layout.stylce.scss"

export default function DashboardLayout() {
  const dashboardSidebar = useAppSelector((state) => state.dashboardSidebar)

  return (
    <div className={`dashboard-layout ${dashboardSidebar.value ? "dashboard-hide-sidebar" : ""}`}>
      <DashboardSidebar />
      <DashboardMainPanel>
        <DashboardHeader />
        <Outlet />
      </DashboardMainPanel>
    </div>
  )
}
