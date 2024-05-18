import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

const autoCollapse = () => {
  const collapse = document.querySelector(".navbar-collapse.collapse");
  collapse?.classList.remove("show");
}

export default function PublicNavbar() {
  const { t } = useTranslation("common", { keyPrefix: "nav" });
  return (
    <Navbar expand="lg" className="public-navbar mb-5 shadow" bg="primary">
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

        <Navbar.Toggle />
        <Navbar.Collapse >
          <Nav>
            <NavLink to={"/auth/signin"} className="nav-link" onClick={autoCollapse}>
              {t("signin")}
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to={"/auth/signup"} className="nav-link" onClick={autoCollapse}>
              {t("signup")}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
