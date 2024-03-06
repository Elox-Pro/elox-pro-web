import { Link } from "react-router-dom"
import "./dashboard-navbar-brand.style.scss"

export enum DashboardNavbarBrandLogo {
  COLOR = "/icons/logo-color-520.png",
  WHITE = "/icons/logo-white-520.png",
}

type DashboardNavbarBrandProps = {
  logo: DashboardNavbarBrandLogo
  size: number
  text: string
}

export default function DashboardNavbarBrand({ logo, size, text }: DashboardNavbarBrandProps) {
  return (
    <Link to="home" className="dashboard-navbar-brand">
      <img src={logo} alt="Elox Pro Logo" width={size} height={size} className="me-2" />
      <span>{text}</span>
    </Link>
  )
}
