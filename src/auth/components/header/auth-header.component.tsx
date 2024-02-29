import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Col, Container, Nav, Row } from "reactstrap"

export default function AuthHeader() {
  const { t } = useTranslation(["nav"])

  return (
    <header className="p-3 text-bg-white">
      <Container>
        <Row className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
          <Col xs="12" lg="auto">
            <Nav className="nav justify-content-center float-md-end">
              <Link to="/" className="nav-link fw-bold py-1 px-0 mb-4">
                {t("nav:home")}
              </Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </header>
  )
}
