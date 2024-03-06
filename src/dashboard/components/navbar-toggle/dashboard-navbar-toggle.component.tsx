import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { toggleSidebar } from "../../features/dashbaord-sidebar.slice"
import { handleShow } from "../../features/dashboard-sidebar-offcanvas.slice"
import DashboardNavbarBrand, { DashboardNavbarBrandLogo } from "../navbar-brand/dashboard-navbar-brand.component"
import "./dashboard-navbar-toggle.style.scss"
export default function DashboardNavbarToggle() {
  const dispatch = useAppDispatch()
  const toggleSidebarAction = () => {
    dispatch(toggleSidebar())
  }
  const handleShowAction = () => {
    dispatch(handleShow())
  }
  return (
    <>
      <div className="dashboard-navbar-toggle dashboard-navbar-toggle-md">
        <button type="button" className="navbar-toggle collapsed" onClick={toggleSidebarAction}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="dashboard-navbar-toggle dashboard-navbar-toggle-xs">
        <DashboardNavbarBrand logo={DashboardNavbarBrandLogo.COLOR} size={24} text="" />
        <button type="button" className="navbar-toggle collapsed" onClick={handleShowAction}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </>
  )
}
