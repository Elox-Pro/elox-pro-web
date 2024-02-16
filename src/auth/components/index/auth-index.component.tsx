import { Col, Container, Row } from "reactstrap"
import LoginForm from "../login/login-form.component"

export default function AuthIndex() {
  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center text-center">
        <Col sm="12" md="8" lg="6">
          <img className="img-fluid mb-3" src="icons/logo-color-520.png" width={80} alt="logo-color" />
          <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}
