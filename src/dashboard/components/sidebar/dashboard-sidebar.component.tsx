import { NavLink } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import NavItem from "react-bootstrap/NavItem"
import "./dashboard-sidebar.style.scss"
import DashboardNavbarBrand, { DashboardNavbarBrandLogo } from "../navbar-brand/dashboard-navbar-brand.component"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../auth/providers/auth.provider"

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
        {NavItemLinks.map((item, index) => (
          <NavItemLink key={index} to={item.to} text={t(`nav:${item.tkey}`)} icon={item.icon} />
        ))}
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

type NavLinkProps = {
  to: string
  text: string
  icon: string
}

function NavItemLink({ to, text, icon }: NavLinkProps) {
  return (
    <NavItem>
      <NavLink to={to} className="nav-link text-white-50">
        <i className={`${icon} fs-5`}></i>
        <span className="ms-2 nav-link-text">{text}</span>
      </NavLink>
    </NavItem>
  )
}
