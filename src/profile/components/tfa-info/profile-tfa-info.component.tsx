import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"
import { useTranslation } from "react-i18next"
import ListGroupItemTfaEmail from "../list-group-item-tfa-email/list-group-item-tfa-email.component"

export default function ProfileTfaInfo() {
    const { t } = useTranslation("profile", { keyPrefix: "tfa-info" });

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-shield-check me-3"></i>
                    {t("title")}
                </Card.Title>
                <p>{t("subtitle")}</p>
                <ListGroup variant="flush">
                    <ListGroupItemTfaEmail />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}