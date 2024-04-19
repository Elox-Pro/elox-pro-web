import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { getProfileFullname } from "../../helpers/get-profile-full-name";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function ListGroupItemFullName() {
    const { profile } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "basic-info.name" });

    if (profile === null) {
        return null;
    }
    const fullName = getProfileFullname(profile.firstName, profile.lastName) || t("value");

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
                                    {fullName}
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