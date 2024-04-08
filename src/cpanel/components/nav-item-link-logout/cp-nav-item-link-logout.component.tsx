import NavItem from "react-bootstrap/NavItem"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { useAuth } from "../../../auth/providers/auth.provider"
import { useTranslation } from "react-i18next"

export default function CPNavItemLinkLogout() {
  const { t } = useTranslation(["nav"])
  const authContext = useAuth()
  const { logout } = authContext
  const text = t("nav:logout")

  const handleLogout = () => {
    try {
      logout()
    } catch (error) {
      console.error("Logout Error:", error)
    }
  }

  return (
    <NavItem>
      <NavItem>
        <a href="#" className="nav-link text-white-50" onClick={handleLogout}>
          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-logout">{text}</Tooltip>}>
            <i className="bi bi-box-arrow-right fs-5"></i>
          </OverlayTrigger>
          <span className="ms-2 nav-link-text">{text}</span>
        </a>
      </NavItem>
    </NavItem>
  )
}
