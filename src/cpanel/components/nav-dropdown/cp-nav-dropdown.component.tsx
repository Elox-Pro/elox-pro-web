import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { Link } from "react-router-dom";
import CPLogout from "../logout/cp-logout.component";
import { useTranslation } from "react-i18next";
import { useActiveUser } from "../../../auth/hooks/active-user.hook";

export default function CPNavDropdown() {
    const { t } = useTranslation("cpanel", { keyPrefix: "navbar" })
    const activeUser = useActiveUser();
    return (
        <NavDropdown
            title={
                <span>
                    {activeUser.username}
                    <i className="ms-2 bi bi-person-circle"></i>
                </span>
            }
            id="dropdown-profile">
            <Link to="/cpanel/profile" className="dropdown-item">
                {t("profile")}
            </Link>
            <NavDropdown.Divider />
            <CPLogout />
        </NavDropdown>
    )
}