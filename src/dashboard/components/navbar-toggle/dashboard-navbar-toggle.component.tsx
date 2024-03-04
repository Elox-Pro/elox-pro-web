import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { toggleSidebar } from "../../features/dashbaord-sidebar.slice"
import "./dashboard-navbar-toggle.style.scss"
export default function DashboardNavbarToggle() {
  const dispatch = useAppDispatch()
  const toggleSidebarAction = () => {
    dispatch(toggleSidebar())
  }
  return (
    <button className="dashboard-navbar-toggle collapsed" onClick={toggleSidebarAction}>
      <span className="navbar-toggler-icon "></span>
    </button>
  )
}
