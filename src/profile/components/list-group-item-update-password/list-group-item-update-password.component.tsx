import { useTranslation } from "react-i18next";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import UpdatePasswordModal from "../update-password-modal/update-password-modal.component";

export default function ListGroupItemUpdatePassword() {
    const { t } = useTranslation("profile", { keyPrefix: "password-info.password" });
    const [showModal, setShowModal] = useState(false);
    
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
                                    ••••••••
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3} className="text-end">
                        <i className="i bi-chevron-right fs-4 fw-bold"></i>
                    </Col>
                </Row>
            </ListGroup.Item>
            <UpdatePasswordModal show={showModal} onHide={onHide} />
        </>
    )
}