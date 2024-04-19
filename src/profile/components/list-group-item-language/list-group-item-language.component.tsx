import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function ListGroupItemLanguage() {
    const { profile, profileTranslations } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "settings.language" });

    if (profile === null || profileTranslations === null) {
        return null;
    }

    const language = profile.lang && profileTranslations[profile.lang];

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
                                    {language}
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