import NavItem from "react-bootstrap/NavItem"
import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { handleClose } from "../../features/dashboard-sidebar-offcanvas.slice"
import { NavLink } from "react-router-dom"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

type NavLinkProps = {
  to: string
  text: string
  icon: string
}

export default function NavItemLink({ to, text, icon }: NavLinkProps) {
  const dispatch = useAppDispatch()

  const handleCloseAction = () => {
    dispatch(handleClose())
  }

  return (
    <NavItem>
      <NavLink to={to} className="nav-link text-white-50" onClick={handleCloseAction}>
        <OverlayTrigger placement="right" overlay={<Tooltip id={to}>{text}</Tooltip>}>
          <i className={`${icon} fs-5`}></i>
        </OverlayTrigger>
        <span className="ms-2 nav-link-text">{text}</span>
      </NavLink>
    </NavItem>
  )
}
