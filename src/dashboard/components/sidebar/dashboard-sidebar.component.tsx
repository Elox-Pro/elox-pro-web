import { NavLink } from "react-router-dom"
import { Container, Row, Col, Nav, NavItem } from "reactstrap"
import "./dashboard-sidebar.style.scss"

export default function DashboardSidebar() {
  return (
    <section className="dashboard-sidebar">
      <Container fluid>
        <Row>
          <Col md="12" lg="12" className="p-0 vh-100 bg-body-tertiary">
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <Nav className="nav nav-pills flex-column mb-auto">
                <NavItem>
                  <NavLink to="/dashboard/home" className="nav-link link-body-emphasis">
                    <i className="bi bi-house me-2 fs-5"></i>
                    {/* Inicio */}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/dashboard/user" className="nav-link link-body-emphasis">
                    <i className="bi bi-people me-2 fs-5"></i>
                    {/* Clientes */}
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
