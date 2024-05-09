import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/esm/Popover";
import { useTranslation } from "react-i18next";
import { useActiveUser } from "../../../auth/hooks/active-user.hook";
import { getProfileAvatar } from "../../../profile/helpers/get-profile-avatar";
import CPLogout from "../logout/cp-logout.component";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./cp-popover.styles.scss"

export function CPPopover() {
    const { t } = useTranslation("cpanel", { keyPrefix: "popover" })
    const activeUser = useActiveUser();
    const avatar = getProfileAvatar(activeUser.avatarUrl);
    const [showPopover, setShowPopover] = useState(false);

    return (
        <>
            <OverlayTrigger
                trigger="click"
                placement={"bottom"}
                rootClose={true}
                show={showPopover}
                onToggle={() => setShowPopover(!showPopover)}
                overlay={
                    <Popover>
                        <button
                            type="button"
                            className="btn-close btn-popover-close"
                            onClick={() => setShowPopover(false)}>
                        </button>
                        <Popover.Body className="px-5 py-3 text-center">
                            <div>
                                <figure role="button" className="figure mb-2 text-center">
                                    <img width={72}
                                        className="rounded-circle"
                                        src={avatar}
                                        alt="avatar" />
                                </figure>
                                <h4 className="mb-3">{t("hi")}, {activeUser.username}</h4>
                                <Link to="/cpanel/profile" className="btn btn-primary btn-sm mb-2">
                                    {t("profile")}
                                </Link>
                            </div>
                            <div className="mt-3">
                                <CPLogout />
                            </div>
                        </Popover.Body>
                    </Popover>
                }>
                <figure role="button" className="figure mb-0 text-center">
                    <img width={36}
                        className="rounded-circle"
                        src={avatar}
                        alt="avatar" />
                </figure>
            </OverlayTrigger>
        </>
    );
}