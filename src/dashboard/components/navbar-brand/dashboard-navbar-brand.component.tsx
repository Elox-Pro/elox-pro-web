import { Link } from "react-router-dom"
import "./dashboard-navbar-brand.style.scss"

export default function DashboardNavbarBrand() {
  return (
    <Link to="home" className="dashboard-navbar-brand">
      <img src="/icons/logo-white-520.png" alt="Elox Pro Logo" width="36" height="36" className="me-2" />
      <span>Elox Pro</span>
    </Link>
  )
}
