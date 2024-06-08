import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Outlet } from "react-router-dom"
import CoverFooter from "../../../cover/components/footer/cover-footer.component"

export default function AuthIndex() {
  return (
    <>
      <Container>
        <Row className="justify-content-center text-center">
          <Col sm="12" md="8" lg="6" className="mt-3">
            <Outlet />
          </Col>
        </Row>
      </Container>
      <Container fluid className="bg-body-tertiary border-top">
        <CoverFooter />
      </Container>
    </>
  )
}
