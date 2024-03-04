import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import DashboardNavbarBrand from "../navbar-brand/dashboard-navbar-brand.component"
import useActiveUser from "../../../auth/hooks/active-user.hook"
import { Link } from "react-router-dom"
import "./dashboard-navbar.style.scss"
import DashboardNavbarToggle from "../navbar-toggle/dashboard-navbar-toggle.component"
export default function DashboardNavbar() {
  const activeUser = useActiveUser()

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="dashboard-navbar">
      <Container fluid>
        <DashboardNavbarBrand />
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
              Profile
            </Link>
            <NavDropdown.Divider />
            <Link to="auth/logout" className="dropdown-item">
              Logout
            </Link>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}
