import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import { useAuth } from "../../../auth/components/providers/auth-provider.component"
import { ActiveUser } from "../../../auth/types/active-user.type"

export default function DashboardHeader() {
  const authContext = useAuth()

  const activeUser: ActiveUser | null = authContext && authContext.activeUser
  return (
    <header className="p-3 text-bg-dark">
      <Container fluid>
        <Row className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Col xs="12" lg="auto">
            <Link
              to="/dashboard/home"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                src="/icons/logo-white-520.png"
                alt="Elox Pro Logo"
                width="40"
                height="40"
                className="bi pe-none me-2"
              />
              Elox Pro
            </Link>
          </Col>
          <Col xs="12" lg="auto">
            <p>{activeUser && activeUser.sub}</p>
          </Col>
        </Row>
      </Container>
    </header>
  )
}
