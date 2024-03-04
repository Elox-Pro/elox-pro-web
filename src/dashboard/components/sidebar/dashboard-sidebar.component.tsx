import { NavLink } from "react-router-dom"
import { Nav, NavItem } from "reactstrap"
import "./dashboard-sidebar.style.scss"
import DashboardNavbarBrand from "../navbar-brand/dashboard-navbar-brand.component"
import { useTranslation } from "react-i18next"

const NavItemLinks = [
  {
    to: "home",
    tkey: "home",
    icon: "bi bi-house",
  },
  {
    to: "user",
    tkey: "customers",
    icon: "bi bi-people",
  },
]

export default function DashboardSidebar() {
  const { t } = useTranslation(["nav"])

  return (
    <section className="dashboard-sidebar text-bg-dark">
      <DashboardNavbarBrand />
      <Nav className="nav nav-pills flex-column mb-auto">
        {NavItemLinks.map((item, index) => (
          <NavItemLink key={index} to={item.to} text={t(`nav:${item.tkey}`)} icon={item.icon} />
        ))}
      </Nav>
      <hr />
      <Nav className="nav nav-pills flex-column mb-auto">
        <NavItemLink to="/auth/logout" text={t("nav:logout")} icon="bi bi-box-arrow-left" />
      </Nav>
    </section>
  )
}

type NavLinkProps = {
  to: string
  text: string
  icon: string
}
function NavItemLink({ to, text, icon }: NavLinkProps) {
  return (
    <NavItem>
      <NavLink to={to} className="nav-link text-white">
        <i className={`${icon} me-2 fs-5`}></i>
        {text}
      </NavLink>
    </NavItem>
  )
}
