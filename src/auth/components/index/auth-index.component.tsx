import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Outlet } from "react-router-dom"
import SignupToast from "../signup-toast/signup-toast.component"
import RecoverPasswordToast from "../../../recover-password/components/recover-password-toast/recover-password-toast.component"

export default function AuthIndex() {
  return (
    <Container>
      <SignupToast />
      <RecoverPasswordToast />
      <Row className="justify-content-center text-center">
        <Col sm="12" md="8" lg="6" className="mt-3">
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}
