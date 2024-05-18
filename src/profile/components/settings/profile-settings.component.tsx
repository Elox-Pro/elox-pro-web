import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"
import { useTranslation } from "react-i18next"
import ListGroupItemLanguage from "../list-group-item-language/list-group-item-language.component"
import ListGroupItemTheme from "../list-group-item-theme/list-group-item-theme.component"

export default function ProfileSettings() {
    const { t } = useTranslation("profile", { keyPrefix: "settings" });

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-gear me-3"></i>
                    {t("title")}
                </Card.Title>
                <ListGroup variant="flush">
                    <ListGroupItemLanguage />
                    <ListGroupItemTheme />
                </ListGroup>
            </Card.Body>
        </Card>
    )

}