import Nav from "react-bootstrap/Nav"
import "./dashboard-sidebar.style.scss"
import DashboardNavbarBrand, { DashboardNavbarBrandLogo } from "../navbar-brand/dashboard-navbar-brand.component"
import { useTranslation } from "react-i18next"
import NavItemLink from "../nav-item-link/nav-item-link.component"
import NavItemLinkLogout from "../nav-item-link-logout/nav-item-link-logout.component"

export default function DashboardSidebar() {
  const { t } = useTranslation(["nav"])

  return (
    <section className="dashboard-sidebar text-bg-dark">
      <DashboardNavbarBrand logo={DashboardNavbarBrandLogo.WHITE} size={24} text="Elox Pro" />
      <Nav className="nav nav-pills flex-column mb-auto">
        <NavItemLink to="home" text={t("nav:home")} icon="bi bi-house" />
        <NavItemLink to="user" text={t("nav:customers")} icon="bi bi-people" />
      </Nav>
      <hr />
      <Nav className="nav nav-pills flex-column mb-auto">
        <NavItemLinkLogout />
      </Nav>
    </section>
  )
}
