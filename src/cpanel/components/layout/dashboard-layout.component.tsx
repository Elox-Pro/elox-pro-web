import { Outlet } from "react-router-dom"
import DashboardSidebar from "../../../dashboard/components/sidebar/dashboard-sidebar.component"
import DashboardHeader from "../header/dashboard-header.component"
import DashboardMainPanel from "../../../dashboard/components/main-panel/dashboard-main-panel.component"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import "./dashboard-layout.stylce.scss"
import DashboardSidebarOffcanvas from "../../../dashboard/components/sidebar-offcanvas/dashboard-sidebar-offcanvas.component"

export default function DashboardLayout() {
  const dashboardSidebar = useAppSelector((state) => state.dashboardSidebar)

  return (
    <div className={`dashboard-layout ${dashboardSidebar.hidden ? "dashboard-hide-sidebar" : ""}`}>
      <DashboardSidebarOffcanvas />
      <DashboardSidebar />
      <DashboardMainPanel>
        <DashboardHeader />
        <Outlet />
      </DashboardMainPanel>
    </div>
  )
}
