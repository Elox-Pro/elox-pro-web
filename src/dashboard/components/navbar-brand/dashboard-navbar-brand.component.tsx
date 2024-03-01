import { Link } from "react-router-dom"

export default function DashboardNavbarBrand() {
  return (
    <Link to="home" className="navbar-brand">
      <img src="/icons/logo-white-520.png" alt="Elox Pro Logo" width="40" height="40" className="me-2" />
      <span>Elox Pro</span>
    </Link>
  )
}
