import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import UpdateGenderModal from "../update-gender-modal/update-gender-modal.component";

export default function ListGroupItemGender() {
    const { profile, profileTranslations } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "basic-info.gender" });
    const [showModal, setShowModal] = useState(false);

    if (profile === null || profileTranslations === null) {
        return null;
    }

    const gender = profile.gender && profileTranslations[profile.gender] || t("value");

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
                                    {gender}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3} className="text-end">
                        <i className="i bi-chevron-right fs-4 fw-bold"></i>
                    </Col>
                </Row>
            </ListGroup.Item>
            <UpdateGenderModal show={showModal} onHide={onHide} />
        </>
    )
}