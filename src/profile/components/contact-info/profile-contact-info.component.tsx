import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"
import { useTranslation } from "react-i18next"
import ListGroupItemEmail from "../list-group-item-email/list-group-item-email.component"
import ListGroupItemPhone from "../list-group-item-phone/list-group-item-phone.component"

export default function ProfileContactInfo() {
    const { t } = useTranslation("profile", { keyPrefix: "contact-info" });
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-person-badge me-3"></i>
                    {t("title")}
                </Card.Title>
                <ListGroup variant="flush">
                    <ListGroupItemEmail />
                    <ListGroupItemPhone />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}