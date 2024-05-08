import Offcanvas from "react-bootstrap/Offcanvas"
import CPSidebar from "../sidebar/cp-sidebar.component"
import "./cp-sidebar-offcanvas.style.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { sidebarOffToggle } from "../../features/cp-sidebar-off-canvas.slice"

export default function CPSidebarOffcanvas() {
  const { sidebarOffShow } = useAppSelector((state) => state.cpSidebarOffcanvas)
  const dispatch = useAppDispatch()

  const handleCloseAction = () => {
    dispatch(sidebarOffToggle())
  }

  return (
    <Offcanvas show={sidebarOffShow} onHide={handleCloseAction} className="cp-sidebar-offcanvas bg-body-tertiary">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <CPSidebar />
      </Offcanvas.Body>
    </Offcanvas>
  )
}
