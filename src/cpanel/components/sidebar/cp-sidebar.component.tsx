import Nav from "react-bootstrap/Nav"
import "./cp-sidebar.style.scss"
import CPNavbarBrand, { CPNavbarBrandLogo } from "../navbar-brand/cp-navbar-brand.component"
import { useTranslation } from "react-i18next"
import CPNavItemLink from "../nav-item-link/cp-nav-item-link.component"
import CPNavItemLinkLogout from "../nav-item-link-logout/cp-nav-item-link-logout.component"

export default function CPSidebar() {
  const { t } = useTranslation(["nav"])

  return (
    <section className="cp-sidebar text-bg-dark">
      <CPNavbarBrand logo={CPNavbarBrandLogo.WHITE} size={24} text="Elox Pro" />
      <Nav className="nav nav-pills flex-column mb-auto">
        <CPNavItemLink to="dashboard" text={t("nav:home")} icon="bi bi-house" />
        <CPNavItemLink to="user" text={t("nav:customers")} icon="bi bi-people" />
      </Nav>
      <hr />
      <Nav className="nav nav-pills flex-column mb-auto">
        <CPNavItemLinkLogout />
      </Nav>
    </section>
  )
}
