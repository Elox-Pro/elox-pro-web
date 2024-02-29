import { Col, Container, Row } from "reactstrap"
import LoginForm from "../login/login-form.component"
import BrandLogo, { BrandLogoType } from "../../../common/components/brand-logo/brand-logo.component"

export default function AuthIndex() {
  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center text-center">
        <Col sm="12" md="8" lg="6">
          <BrandLogo type={BrandLogoType.FULL} />
          <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}
