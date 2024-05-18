import { useTranslation } from "react-i18next"
import { useLogoutHandler } from "../../hooks/logout-handler.hook"

export default function CPLogout() {
    const { t } = useTranslation("cpanel", { keyPrefix: "logout" })
    const { handleLogout, overlay } = useLogoutHandler();
    return (
        <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            disabled={overlay.active}
            onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i>
            <span>{t("text")}</span>
        </button>
    )
}