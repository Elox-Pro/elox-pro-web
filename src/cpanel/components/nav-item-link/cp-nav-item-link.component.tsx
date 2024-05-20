import NavItem from "react-bootstrap/NavItem"
import { useAppDispatch } from "../../../app/hooks/app.hooks"
import { NavLink } from "react-router-dom"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { setSidebarOff } from "../../features/cp.slice"

type CPNavLinkProps = {
  to: string
  text: string
  icon: string
}

export default function CPNavItemLink({ to, text, icon }: CPNavLinkProps) {
  const dispatch = useAppDispatch()

  const handleCloseAction = () => {
    dispatch(setSidebarOff(false));
  }

  return (
    <NavItem>
      <NavLink to={to} className="nav-link" onClick={handleCloseAction}>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={to}>{text}</Tooltip>}>
          <i className={icon}></i>
        </OverlayTrigger>
        <span className="ms-2 nav-link-text">{text}</span>
      </NavLink>
    </NavItem>
  )
}
