import { useEffect } from "react"
import { useGetProfileQuery } from "../../api/profile.api"
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import ListGroup from "react-bootstrap/esm/ListGroup"
import Card from "react-bootstrap/esm/Card"

export default function ProfileIndex() {

  const { data, error, isLoading, status } = useGetProfileQuery()
  const user = data?.user

  return (
    <CPWrapperPage loading={isLoading} error={error} status={status}>
      {user && <>
        <Row className="text-center">
          <Col>
            <h1>Personal info</h1>
            <p>
              Info about you and your preferences.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card >
              <Card.Body>
                <Card.Title>Basic info</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <div>Username</div>
                    <div>{user.username}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                </ListGroup>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
      }
    </CPWrapperPage>
  )
}
