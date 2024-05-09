import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import "./cp-navbar.style.scss"
import CPNavbarToggle from "../navbar-toggle/cp-navbar-toggle.component"
import { useEffect, useState } from "react"
import { CPPopover } from "../popover/cp-popover.component"
export default function CPNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  return (
    <nav className={`cp-navbar navbar bg-body-tertiary navbar-expand-lg ${isScrolled ? 'scrolled' : ''}`}>
      <Container fluid>
        <Nav className="me-auto">
          <CPNavbarToggle />
        </Nav>
        <Nav className="ms-auto">
          <CPPopover />
        </Nav>
      </Container>
    </nav>
  )
}
