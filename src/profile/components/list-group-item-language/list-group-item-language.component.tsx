import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FlagIcon from "../../../common/components/flag-icon/flag-icon.component";
import useAppLanguage from "../../../common/hooks/app-language.hook";
import { useState } from "react";
import UpdateLanguageModal from "../update-language-modal/update-language-modal.component";

export default function ListGroupItemLanguage() {
    const { profile } = useAppSelector(state => state.profile);
    const { language } = useAppLanguage();
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation("profile", { keyPrefix: "settings.language" });

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
                                    <FlagIcon country={language.flag} />&nbsp;
                                    {t(language.code || "")}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3} className="text-end">
                        <i className="i bi-chevron-right fs-4 fw-bold"></i>
                    </Col>
                </Row>
            </ListGroup.Item>
            <UpdateLanguageModal show={showModal} onHide={onHide} />
        </>
    )
}