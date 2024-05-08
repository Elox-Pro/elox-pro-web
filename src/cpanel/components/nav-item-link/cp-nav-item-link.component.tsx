import NavItem from "react-bootstrap/NavItem"
import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { sidebarOffToggle } from "../../features/cp-sidebar-off-canvas.slice"
import { NavLink } from "react-router-dom"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

type CPNavLinkProps = {
  to: string
  text: string
  icon: string
}

export default function CPNavItemLink({ to, text, icon }: CPNavLinkProps) {
  const dispatch = useAppDispatch()

  const handleCloseAction = () => {
    dispatch(sidebarOffToggle())
  }

  return (
    <NavItem>
      <NavLink to={to} className="nav-link" onClick={handleCloseAction}>
        <OverlayTrigger placement="right" overlay={<Tooltip id={to}>{text}</Tooltip>}>
          <i className={`${icon} fs-5`}></i>
        </OverlayTrigger>
        <span className="ms-2 nav-link-text">{text}</span>
      </NavLink>
    </NavItem>
  )
}
