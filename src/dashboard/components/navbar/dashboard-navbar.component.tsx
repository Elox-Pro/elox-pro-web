import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import "./dashboard-navbar.style.scss"
import DashboardNavbarToggle from "../navbar-toggle/dashboard-navbar-toggle.component"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../auth/providers/auth.provider"
export default function DashboardNavbar() {
  const { t } = useTranslation(["nav"])
  const authContext = useAuth()
  const { activeUser, logout } = authContext

  const handleLogout = () => {
    try {
      logout()
    } catch (error) {
      console.error("Logout Error:", error)
    }
  }

  return (
    <Navbar expand="lg" className="dashboard-navbar">
      <Container fluid>
        <Nav className="me-auto">
          <DashboardNavbarToggle />
        </Nav>
        <Nav className="ms-auto">
          <NavDropdown
            title={
              <span>
                {activeUser?.sub}
                <i className="ms-2 bi bi-person-circle"></i>
              </span>
            }
            id="dropdown-profile"
          >
            <Link to="dashboard/user/profile" className="dropdown-item">
              {t("nav:profile")}
            </Link>
            <NavDropdown.Divider />
            <button type="button" className="dropdown-item" onClick={handleLogout}>
              {t("nav:logout")}
            </button>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}
