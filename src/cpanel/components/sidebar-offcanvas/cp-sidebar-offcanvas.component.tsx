import Offcanvas from "react-bootstrap/Offcanvas"
import CPSidebar from "../sidebar/cp-sidebar.component"
import "./cp-sidebar-offcanvas.style.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { setSidebarOff } from "../../features/cp.slice"

export default function CPSidebarOffcanvas() {
  const { sidebarOff } = useAppSelector((state) => state.cp.sidebarOffcanvas)
  const dispatch = useAppDispatch()

  const handleCloseAction = () => {
    dispatch(setSidebarOff(false))
  }

  return (
    <Offcanvas show={sidebarOff} onHide={handleCloseAction} className="cp-sidebar-offcanvas bg-body-tertiary">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <CPSidebar />
      </Offcanvas.Body>
    </Offcanvas>
  )
}
