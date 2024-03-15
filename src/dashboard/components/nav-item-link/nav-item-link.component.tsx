import NavItem from "react-bootstrap/NavItem"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { handleClose } from "../../features/dashboard-sidebar-offcanvas.slice"
import { NavLink } from "react-router-dom"

type NavLinkProps = {
  to: string
  text: string
  icon: string
}

export default function NavItemLink({ to, text, icon }: NavLinkProps) {
  const { show } = useAppSelector((state) => state.dashboardSidebarOffcanvas)
  const dispatch = useAppDispatch()

  const handleCloseAction = () => {
    if (show) {
      dispatch(handleClose())
    }
  }

  return (
    <NavItem>
      <NavLink to={to} className="nav-link text-white-50" onClick={handleCloseAction}>
        <i className={`${icon} fs-5`}></i>
        <span className="ms-2 nav-link-text">{text}</span>
      </NavLink>
    </NavItem>
  )
}
