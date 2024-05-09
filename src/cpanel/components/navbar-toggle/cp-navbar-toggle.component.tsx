import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { setSidebarOff } from "../../features/cp-sidebar-off-canvas.slice"
import { toggleSidebar } from "../../features/cp-sidebar.slice"
import CPNavbarBrand, { CPNavbarBrandLogo } from "../navbar-brand/cp-navbar-brand.component"
import "./cp-navbar-toggle.style.scss"
export default function CPNavbarToggle() {
  const dispatch = useAppDispatch()
  const toggleSidebarAction = () => {
    dispatch(toggleSidebar())
  }
  const handleShowAction = () => {
    dispatch(setSidebarOff(true))
  }
  return (
    <>
      <div className="cp-navbar-toggle cp-navbar-toggle-md">
        <button type="button" className="navbar-toggle collapsed" onClick={toggleSidebarAction}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="cp-navbar-toggle cp-navbar-toggle-xs">
        <CPNavbarBrand logo={CPNavbarBrandLogo.COLOR} size={24} text="" />
        <button type="button" className="navbar-toggle collapsed" onClick={handleShowAction}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </>
  )
}
