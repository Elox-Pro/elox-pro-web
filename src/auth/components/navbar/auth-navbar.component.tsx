import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function AuthNavbar() {
  const { t } = useTranslation(["nav"])
  return (
    <Navbar expand="lg">
      <Container>
        <Nav className="ms-auto">
          <Link to={"/"} className="nav-link">
            {t("nav:home")}
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
