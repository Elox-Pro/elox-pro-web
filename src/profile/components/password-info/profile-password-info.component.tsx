import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import { useTranslation } from "react-i18next"

export default function ProfilePasswordInfo() {
    const { t } = useTranslation("profile", { keyPrefix: "password_info" });
    const handleChangePassword = () => {
        alert("Not implemented")
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-file-lock2 me-3"></i>
                    {t("title")}
                </Card.Title>
                <p>{t("subtitle")}</p>
                <ListGroup variant="flush">
                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("password.label")}
                        value="••••••••"
                        onClick={handleChangePassword}
                    />
                </ListGroup>
            </Card.Body>
        </Card>
    )
}