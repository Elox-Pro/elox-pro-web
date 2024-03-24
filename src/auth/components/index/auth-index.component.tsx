import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import BrandLogo, { BrandLogoType } from "../../../common/components/brand-logo/brand-logo.component"
import { Outlet } from "react-router-dom"
import SignupToast from "../signup-toast/signup-toast.component"

export default function AuthIndex() {
  return (
    <Container>
      <SignupToast />
      <Row className="justify-content-center text-center">
        <Col sm="12" md="8" lg="6">
          <BrandLogo type={BrandLogoType.FULL} />
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}
