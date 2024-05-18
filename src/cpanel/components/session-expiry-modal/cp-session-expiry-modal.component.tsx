import Modal from "react-bootstrap/esm/Modal";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/esm/Button";
import { setShowSessionExpiryModal } from "../../features/cp.slice";
import { useLogoutHandler } from "../../hooks/logout-handler.hook";
import { useStayInSession } from "../../hooks/stay-in-session.hook";

export default function CPSessionExpiryModal() {
    const { t } = useTranslation("cpanel", { keyPrefix: "session-expiry" });
    const modal = useAppSelector(state => state.cp.sessionExpiryModal);
    const logoutHandler = useLogoutHandler();
    const statyInSession = useStayInSession();
    const dispatch = useAppDispatch();

    const handleLeave = () => {
        dispatch(setShowSessionExpiryModal(false));
        logoutHandler.handleLogout();
    }

    const handleStay = () => {
        statyInSession.handleCheck();
    }

    return (
        <Modal
            show={modal.show}
            backdrop="static"
            keyboard={false}>
            <Modal.Header>
                <Modal.Title>{t("modal.header")}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-3">
                {t("modal.body")}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleLeave}
                    disabled={logoutHandler.overlay.active || statyInSession.overlay.active}>
                    {t("modal.leave")}
                </Button>
                <Button
                    variant="primary"
                    onClick={handleStay}
                    autoFocus={true}
                    disabled={logoutHandler.overlay.active || statyInSession.overlay.active}>
                    {t("modal.stay")}
                </Button>
            </Modal.Footer>
        </Modal>
    )

}