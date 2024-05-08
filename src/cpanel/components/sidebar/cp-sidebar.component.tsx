import Nav from "react-bootstrap/Nav"
import "./cp-sidebar.style.scss"
import CPNavbarBrand, { CPNavbarBrandLogo } from "../navbar-brand/cp-navbar-brand.component"
import { useTranslation } from "react-i18next"
import CPNavItemLink from "../nav-item-link/cp-nav-item-link.component"

export default function CPSidebar() {
  const { t } = useTranslation("cpanel", { keyPrefix: "sidebar" })

  return (
    <section className="cp-sidebar border-right bg-body-tertiary">
      <CPNavbarBrand logo={CPNavbarBrandLogo.COLOR} size={24} text="Elox Pro" />
      <Nav className="nav nav-pills flex-column mb-auto">
        <CPNavItemLink to="dashboard" text={t("home")} icon="bi bi-house" />
      </Nav>
      {/* Implement other options */}
      {/* <hr />
      <Nav className="nav nav-pills flex-column mb-auto">
        <CPNavItemLink to="dashboard" text={t("home")} icon="bi bi-house" />
      </Nav> */}
    </section>
  )
}
