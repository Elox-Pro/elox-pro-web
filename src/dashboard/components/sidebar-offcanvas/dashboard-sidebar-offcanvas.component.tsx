import Offcanvas from "react-bootstrap/Offcanvas"
import DashboardSidebar from "../sidebar/dashboard-sidebar.component"
import "./dashboard-sidebar-offcanvas.style.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { handleClose } from "../../features/dashboard-sidebar-offcanvas.slice"

export default function DashboardSidebarOffcanvas() {
  const { show } = useAppSelector((state) => state.dashboardSidebarOffcanvas)
  const dispatch = useAppDispatch()

  const handleCloseAction = () => {
    dispatch(handleClose())
  }

  return (
    <Offcanvas show={show} onHide={handleCloseAction} className="dashboard-sidebar-offcanvas" data-bs-theme="dark">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <DashboardSidebar />
      </Offcanvas.Body>
    </Offcanvas>
  )
}
