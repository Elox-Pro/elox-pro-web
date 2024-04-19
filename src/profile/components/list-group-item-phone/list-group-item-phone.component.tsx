import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Badge from "react-bootstrap/esm/Badge";

export default function ListGroupItemPhone() {
    const { profile } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "contact-info.phone" });

    if (profile === null) {
        return null;
    }

    const phone = profile.phone || t("value");
    const phoneVerified = profile.phoneVerified;

    const onClick = () => {
        alert("Not implemented");
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
                                    <span className="me-3">{phone}</span>
                                    {phoneVerified && <Badge bg="success">{t("verified")}</Badge>}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3} className="text-end">
                        <i className="i bi-chevron-right fs-4 fw-bold"></i>
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    )
}