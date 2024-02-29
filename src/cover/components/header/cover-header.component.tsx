import { Row, Col, Nav } from "reactstrap"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
export default function CoverHeader() {
  const { t } = useTranslation(["nav"])

  return (
    <header className="mb-auto">
      <Row>
        <Col xs={12}>
          <div>
            <Nav className="nav nav-masthead justify-content-center float-md-end">
              <Link to={"/auth"} className="nav-link fw-bold py-1 px-0 mb-4 active">
                {t("nav:login")}
              </Link>
            </Nav>
          </div>
        </Col>
      </Row>
    </header>
  )
}
