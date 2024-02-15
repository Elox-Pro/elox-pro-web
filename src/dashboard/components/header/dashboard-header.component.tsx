import { useState } from "react"
import { Link } from "react-router-dom"
import { Nav, NavItem, NavLink, Container, Offcanvas, OffcanvasBody } from "reactstrap"

export default function DashboardHeader() {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false)

  const toggleOffcanvas = () => setOffcanvasOpen(!offcanvasOpen)

  return (
    <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
      <Container fluid>
        <Nav col-md="3" col-lg="2" className="me-0 px-3 fs-6 text-white">
          <Link
            to="/dashboard"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <img
              src="/icons/logo-white-520.png"
              alt="Elox Pro Logo"
              width="40"
              height="40"
              className="bi pe-none me-2"
            />
            <span className="fs-4">Elox Pro</span>
          </Link>
        </Nav>

        <Nav className="flex-row d-md-none">
          <NavItem>
            <NavLink className="px-3 text-white" type="button" onClick={toggleOffcanvas}>
              <i className="bi bi-list"></i>
            </NavLink>
          </NavItem>
        </Nav>

        <Offcanvas isOpen={offcanvasOpen} onToggle={toggleOffcanvas}>
          <OffcanvasBody>Offcanvas content here</OffcanvasBody>
        </Offcanvas>
      </Container>
    </header>
  )
}
