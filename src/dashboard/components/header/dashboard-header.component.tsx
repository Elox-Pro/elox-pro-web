import { Row, Col } from "reactstrap"
import BrandLink from "../../../common/components/brand-link/brand-link.component"
import DropdownProfile from "../dropdown-profile/dropdown-profile.component"
import "./dashboard-header.style.scss"

export default function DashboardHeader() {
  return (
    <header className="dashboard-header sticky-top text-bg-dark">
      <Row className="g-0 align-items-center">
        <Col lg="2" md="3">
          <BrandLink to="/dashboard/home" isText={true} />
        </Col>
        <Col lg="10" md="9" className="text-end">
          <ul className="navbar-nav flex-row justify-content-end">
            <li className="nav-item">Another item</li>
            <li className="nav-item">
              <DropdownProfile />
            </li>
          </ul>
        </Col>
      </Row>
    </header>
  )
}
