import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import "./public-navbar.style.scss"

export default function PublicNavbar() {
  const { t } = useTranslation(["nav"])

  return (
    <Navbar expand="lg" className="public-navbar mb-5 shadow" bg="primary">
      <Container>
        <Nav>
          <NavLink to={"/"} className="nav-link">
            {t("nav:home")}
          </NavLink>
        </Nav>
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
      </Container>
    </Navbar>
  )
}
