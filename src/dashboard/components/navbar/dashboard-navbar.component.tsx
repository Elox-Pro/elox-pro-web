import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import useActiveUser from "../../../auth/hooks/active-user.hook"
import { Link } from "react-router-dom"
import "./dashboard-navbar.style.scss"
import DashboardNavbarToggle from "../navbar-toggle/dashboard-navbar-toggle.component"
import { useTranslation } from "react-i18next"
export default function DashboardNavbar() {
  const { t } = useTranslation(["nav"])
  const activeUser = useActiveUser()

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
            <Link to="/auth/logout" className="dropdown-item">
              {t("nav:logout")}
            </Link>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}
