import { Outlet } from "react-router-dom"
import CPSidebar from "../sidebar/cp-sidebar.component"
import CPHeader from "../header/cp-header.component"
import CPMain from "../main/cp-main.component"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import "./cp-layout.stylce.scss"
import CPSidebarOffcanvas from "../sidebar-offcanvas/cp-sidebar-offcanvas.component"
import CPSessionExpiryModal from "../session-expiry-modal/cp-session-expiry-modal.component"

export default function CPLayout() {
  const sidebar = useAppSelector((state) => state.cp.sidebar)

  return (
    <div className={`cp-layout ${sidebar.hidden ? "cp-hide-sidebar" : ""}`}>
      <CPSidebarOffcanvas />
      <CPSidebar />
      <CPMain>
        <CPHeader />
        <Outlet />
      </CPMain>
      <CPSessionExpiryModal />
    </div>
  )
}
