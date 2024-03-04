import { NavLink } from "react-router-dom"
import { Nav, NavItem } from "reactstrap"
import "./dashboard-sidebar.style.scss"
import DashboardNavbarBrand from "../navbar-brand/dashboard-navbar-brand.component"

export default function DashboardSidebar() {
  return (
    <section className="dashboard-sidebar text-bg-dark">
      <DashboardNavbarBrand />
      <Nav className="nav nav-pills flex-column mb-auto">
        <NavItem>
          <NavLink to="/dashboard/home" className="nav-link text-white">
            <i className="bi bi-house me-2 fs-5"></i>
            Inicio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/dashboard/user" className="nav-link text-white">
            <i className="bi bi-people me-2 fs-5"></i>
            Clientes
          </NavLink>
        </NavItem>
      </Nav>
      <hr />
      <Nav className="nav nav-pills flex-column mb-auto">
        <NavItem>
          <NavLink to="/auth/logout" className="nav-link text-white">
            <i className="bi bi-people me-2 fs-5"></i>
            Cerrar sesión
          </NavLink>
        </NavItem>
      </Nav>
    </section>
  )
}
