import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import UpdateThemeModal from "../update-theme-modal/update-theme-modal.component";
import ThemeIcon from "../../../common/components/theme-icon/theme-icon.component";

export default function ListGroupItemTheme() {
    const { profile } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "settings.theme" });
    const theme = useAppSelector(state => state.common.theme);
    const [showModal, setShowModal] = useState(false);

    if (profile === null) {
        return null;
    }

    const onClick = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    return (
        <>
            <ListGroup.Item className="px-0 py-3" action onClick={onClick}>
                <Row className="w-100 align-items-center g-0">
                    <Col xs={9}>
                        <Row className="w-100 align-items-center g-0">
                            <Col xs={12} md={4}>
                                <p className="mb-0 text-muted">
                                    {t("label")}
                                </p>
                            </Col>
                            <Col xs={12} md={8}>
                                <p className="mb-0">
                                    <ThemeIcon theme={theme.value} />&nbsp;
                                    {t(theme.value)}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3} className="text-end">
                        <i className="i bi-chevron-right fs-4 fw-bold"></i>
                    </Col>
                </Row>
            </ListGroup.Item>
            <UpdateThemeModal show={showModal} onHide={onHide} />
        </>
    )
}