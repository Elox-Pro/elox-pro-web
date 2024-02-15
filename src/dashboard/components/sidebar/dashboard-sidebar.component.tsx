import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { Container, Row, Col, Nav, NavItem } from "reactstrap"

type SideBarProps = {
  children: ReactNode
}

export default function DashboardSidebar({ children }: SideBarProps) {
  return (
    <Container fluid>
      <Row>
        <Col md="3" lg="2" className="p-0 vh-100 bg-body-tertiary">
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <Nav className="nav nav-pills flex-column mb-auto">
              <NavItem>
                <NavLink to="/dashboard/home" className="nav-link link-body-emphasis">
                  <i className="bi bi-house me-2 fs-5"></i>
                  Inicio
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dashboard/user" className="nav-link link-body-emphasis">
                  <i className="bi bi-people me-2 fs-5"></i>
                  Clientes
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Col>
        <Col md="9" lg="10" className="px-md-4 ms-sm-auto h-100">
          {children}
        </Col>
      </Row>
    </Container>
  )
}
