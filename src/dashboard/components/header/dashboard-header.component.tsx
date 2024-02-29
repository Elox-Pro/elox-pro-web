import { Container, Row, Col } from "reactstrap"
import { useAuth } from "../../../auth/providers/auth.provider"
import { ActiveUser } from "../../../auth/types/active-user.type"
import BrandLink from "../../../common/components/brand-link/brand-link.component"

export default function DashboardHeader() {
  const authContext = useAuth()

  const activeUser: ActiveUser | null = authContext && authContext.activeUser
  return (
    <header className="p-3 text-bg-dark">
      <Container fluid>
        <Row className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Col xs="12" lg="auto">
            <BrandLink to="/dashboard/home" isText={true} />
          </Col>
          <Col xs="12" lg="auto">
            <p>{activeUser && activeUser.sub}</p>
          </Col>
        </Row>
      </Container>
    </header>
  )
}
