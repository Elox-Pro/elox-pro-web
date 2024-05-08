import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import "./cp-navbar.style.scss"
import CPNavbarToggle from "../navbar-toggle/cp-navbar-toggle.component"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import CPLogout from "../logout/cp-logout.component"
import { useActiveUser } from "../../../auth/hooks/active-user.hook"
export default function CPNavbar() {
  const { t } = useTranslation("cpanel", { keyPrefix: "navbar" })
  const activeUser = useActiveUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  return (
    <nav className={`cp-navbar navbar bg-body-tertiary navbar-expand-lg ${isScrolled ? 'scrolled' : ''}`}>
      <Container fluid>
        <Nav className="me-auto">
          <CPNavbarToggle />
        </Nav>
        <Nav className="ms-auto">
          <NavDropdown
            title={
              <span>
                {activeUser.username}
                <i className="ms-2 bi bi-person-circle"></i>
              </span>
            }
            id="dropdown-profile">
            <Link to="/cpanel/profile" className="dropdown-item">
              {t("profile")}
            </Link>
            <NavDropdown.Divider />
            <CPLogout />
          </NavDropdown>
        </Nav>
      </Container>
    </nav>
  )
}
