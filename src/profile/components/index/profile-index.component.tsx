import { useGetProfileQuery } from "../../api/profile.api"
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import ListGroup from "react-bootstrap/esm/ListGroup"
import Card from "react-bootstrap/esm/Card"

import "./profile-index.styles.scss"
import Button from "react-bootstrap/esm/Button"

export default function ProfileIndex() {

  const { data, error, isLoading, status } = useGetProfileQuery()
  const user = data?.user

  return (
    <CPWrapperPage loading={isLoading} error={error} status={status}>
      {user &&
        <div className="profile-index">
          <Row className="text-center">
            <Col>
              <p className="fs-1 mb-0">Personal info</p>
              <p>
                Info about you and your preferences.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card >
                <Card.Body>
                  <Card.Title>
                    <p className="fs-2 fw-normal">Basic info</p>
                  </Card.Title>
                  <ListGroup variant="flush">

                    <ListGroup.Item className="px-0 py-3">
                      <Row className="w-100 align-items-center g-0">
                        <Col xs={9} >
                          <Row className="w-100 align-items-center g-0">
                            <Col xs={12} md={3}>
                              <p className="mb-0 text-muted">Profile Picture</p>
                            </Col>
                            <Col xs={12} md={9}>
                              <p className="mb-0">A profile pictures helps personalize your account</p>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={3} className="text-end">

                          <figure className="figure mb-0 text-center">
                            <img width={48} className="rounded-circle"
                              src="https://api.dicebear.com/8.x/bottts-neutral/svg?seed=Sophie"
                              alt="avatar" />
                            <figcaption className="figure-caption">
                              <i className="bi bi-camera"></i>
                            </figcaption>
                          </figure>


                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-3">
                      <Row className="w-100 align-items-center g-0">
                        <Col xs={9}>
                          <Row className="w-100 align-items-center g-0">
                            <Col xs={12} md={3}>
                              <p className="mb-0 text-muted">Username</p>
                            </Col>
                            <Col xs={12} md={9}>
                              <p className="mb-0">{user.username}</p>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={3} className="text-end">
                          <i className="fs-4 fw-bold bi bi-chevron-right"></i>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-3">
                      <Row className="w-100 align-items-center g-0">
                        <Col xs={9} md={9} lg={9}>
                          <Row className="w-100 align-items-center g-0">
                            <Col xs={12} md={3}>
                              <p className="mb-0 text-muted">Email</p>
                            </Col>
                            <Col xs={12} md={9}>
                              <p className="mb-0">{user.email}</p>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={3} className="text-end d-none">
                          <i className="fs-4 fw-bold bi bi-chevron-right"></i>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-3">
                      <Row className="w-100 align-items-center g-0">
                        <Col xs={9} >
                          <Row className="w-100 align-items-center g-0">
                            <Col xs={12} >
                              <p className="mb-0 text-muted">More options</p>
                            </Col>
                            <Col xs={12} >
                              <Button variant="outline-dark" className="mt-4 fw-medium">
                                <i className="bi bi-pencil-square text-primary"></i> <span>Editar</span>
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={3} className="text-end d-none">
                          <i className="fs-4 fw-bold bi bi-chevron-right"></i>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      }
    </CPWrapperPage>
  )
}
