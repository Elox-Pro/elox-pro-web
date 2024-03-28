import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import "./public-navbar.style.scss"

export default function PublicNavbar() {
  const { t } = useTranslation(["nav"])

  return (
    <Navbar expand="lg" className="public-navbar mb-5 shadow" bg="primary" data-bs-theme="dark">
      <Container>
        <NavLink to={"/"} className="navbar-brand">
          <img
            src="/icons/logo-white-520.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Elox Pro Logo"
          />
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavLink to={"/auth/signin"} className="nav-link">
              {t("nav:login")}
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to={"/auth/signup"} className="nav-link">
              {t("nav:signup")}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
