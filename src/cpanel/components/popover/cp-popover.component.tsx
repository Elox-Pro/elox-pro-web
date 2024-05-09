import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/esm/Popover";
import { useTranslation } from "react-i18next";
import { useActiveUser } from "../../../auth/hooks/active-user.hook";
import { getProfileAvatar } from "../../../profile/helpers/get-profile-avatar";
import CPLogout from "../logout/cp-logout.component";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./cp-popover.styles.scss"
import Button from "react-bootstrap/esm/Button";

export function CPPopover() {
    const { t } = useTranslation("cpanel", { keyPrefix: "popover" });
    const navigate = useNavigate();
    const activeUser = useActiveUser();
    const avatar = getProfileAvatar(activeUser.avatarUrl);
    const [showPopover, setShowPopover] = useState(false);
    const handleProfileLink = () => {
        setShowPopover(false);
        navigate("/cpanel/profile");
    }

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
                                <Button
                                    type="button"
                                    role="link"
                                    size="sm"
                                    color="primary"
                                    className="mb-2"
                                    onClick={handleProfileLink}>
                                    {t("profile")}
                                </Button>
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