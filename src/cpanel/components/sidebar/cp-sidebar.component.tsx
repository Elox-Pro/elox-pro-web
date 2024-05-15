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
        <CPNavItemLink to="orders" text={t("orders")} icon="bi bi-file" />
        <CPNavItemLink to="products" text={t("products")} icon="bi bi-cart" />
        <CPNavItemLink to="customers" text={t("customers")} icon="bi bi-people" />
        <CPNavItemLink to="reports" text={t("reports")} icon="bi bi-graph-up" />
      </Nav>
      <hr />
      <Nav className="nav nav-pills flex-column mb-auto">
        <CPNavItemLink to="settings" text={t("settings")} icon="bi bi-gear" />
      </Nav>
    </section>
  )
}
