import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import "./cp-navbar.style.scss"
import CPNavbarToggle from "../navbar-toggle/cp-navbar-toggle.component"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../auth/providers/auth.provider"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
export default function CPNavbar() {
  const { t } = useTranslation("cpanel", { keyPrefix: "navbar" })
  const authContext = useAuth()

  const handleLogout = () => {
    try {
      authContext.logout()
    } catch (error) {
      toast.error(t("logout.error"));
      console.error("Logout Error:", error)
    }
  }

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  return (
    <Navbar expand="lg" className={`cp-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Container fluid>
        <Nav className="me-auto">
          <CPNavbarToggle />
        </Nav>
        <Nav className="ms-auto">
          <NavDropdown
            title={
              <span>
                {authContext.activeUser?.sub}
                <i className="ms-2 bi bi-person-circle"></i>
              </span>
            }
            id="dropdown-profile">
            <Link to="/cpanel/profile" className="dropdown-item">
              {t("profile")}
            </Link>
            <NavDropdown.Divider />
            <button type="button" className="dropdown-item" onClick={handleLogout}>
              {t("logout.text")}
            </button>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}
