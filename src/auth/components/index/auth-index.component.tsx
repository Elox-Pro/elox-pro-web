import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LoginForm from "../login/login-form.component"
import BrandLogo, { BrandLogoType } from "../../../common/components/brand-logo/brand-logo.component"

export default function AuthIndex() {
  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col sm="12" md="8" lg="6">
          <BrandLogo type={BrandLogoType.FULL} />
          <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}
