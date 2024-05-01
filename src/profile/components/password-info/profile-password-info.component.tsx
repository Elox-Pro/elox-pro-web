import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"
import { useTranslation } from "react-i18next"
import ListGroupItemUpdatePassword from "../list-group-item-update-password/list-group-item-update-password.component";

export default function ProfilePasswordInfo() {
    const { t } = useTranslation("profile", { keyPrefix: "password-info" });

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-file-lock2 me-3"></i>
                    {t("title")}
                </Card.Title>
                <p>{t("subtitle")}</p>
                <ListGroup variant="flush">
                    <ListGroupItemUpdatePassword />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}