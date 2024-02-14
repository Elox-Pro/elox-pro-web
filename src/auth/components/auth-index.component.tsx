import { Col, Container, Row } from "reactstrap"
import LoginForm from "./login-form.component"

export default function AuthIndex() {
  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center">
        <Col sm="12" md="8" lg="6">
          <img className="img-fluid mb-5" src="icons/logo-520.png" width={80} />
          <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}
