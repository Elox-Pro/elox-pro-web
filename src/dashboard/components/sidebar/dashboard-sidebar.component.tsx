import Nav from "react-bootstrap/Nav"
import NavItem from "react-bootstrap/NavItem"
import "./dashboard-sidebar.style.scss"
import DashboardNavbarBrand, { DashboardNavbarBrandLogo } from "../navbar-brand/dashboard-navbar-brand.component"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../auth/providers/auth.provider"
import NavItemLink from "../nav-item-link/nav-item-link.component"

export default function DashboardSidebar() {
  const { t } = useTranslation(["nav"])
  const authContext = useAuth()
  const { logout } = authContext

  const handleLogout = () => {
    try {
      logout()
    } catch (error) {
      console.error("Logout Error:", error)
    }
  }

  return (
    <section className="dashboard-sidebar text-bg-dark">
      <DashboardNavbarBrand logo={DashboardNavbarBrandLogo.WHITE} size={24} text="Elox Pro" />
      <Nav className="nav nav-pills flex-column mb-auto">
        <NavItemLink to="home" text={t("nav:home")} icon="bi bi-house" />
        <NavItemLink to="user" text={t("nav:customers")} icon="bi bi-people" />
      </Nav>
      <hr />
      <Nav className="nav nav-pills flex-column mb-auto">
        <NavItem>
          <a href="#" className="nav-link text-white-50" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right fs-5"></i>
            <span className="ms-2 nav-link-text">{t("nav:logout")}</span>
          </a>
        </NavItem>
      </Nav>
    </section>
  )
}
