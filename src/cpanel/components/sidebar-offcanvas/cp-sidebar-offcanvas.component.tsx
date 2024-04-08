import Offcanvas from "react-bootstrap/Offcanvas"
import CPSidebar from "../sidebar/cp-sidebar.component"
import "./cp-sidebar-offcanvas.style.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { handleClose } from "../../features/cp-sidebar-offcanvas.slice"

export default function CPSidebarOffcanvas() {
  const { show } = useAppSelector((state) => state.cpSidebarOffcanvas)
  const dispatch = useAppDispatch()

  const handleCloseAction = () => {
    dispatch(handleClose())
  }

  return (
    <Offcanvas show={show} onHide={handleCloseAction} className="cp-sidebar-offcanvas" data-bs-theme="dark">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <CPSidebar />
      </Offcanvas.Body>
    </Offcanvas>
  )
}
