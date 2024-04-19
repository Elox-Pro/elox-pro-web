import NavItem from "react-bootstrap/NavItem"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { useAuth } from "../../../auth/hooks/auth.hook"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

export default function CPNavItemLinkLogout() {
  const { t } = useTranslation("cpanel", { keyPrefix: "sidebar" })
  const authContext = useAuth()
  const text = t("logout.text")

  const handleLogout = () => {
    try {
      authContext.logout()
    } catch (error) {
      toast.error(t("logout.error"));
      console.error("Logout Error:", error)
    }
  }

  return (
    <NavItem>
      <NavItem>
        <a href="#" className="nav-link text-white-50" onClick={handleLogout}>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-logout">
              {text}
            </Tooltip>}>
            <i className="bi bi-box-arrow-right fs-5"></i>
          </OverlayTrigger>
          <span className="ms-2 nav-link-text">{text}</span>
        </a>
      </NavItem>
    </NavItem>
  )
}
