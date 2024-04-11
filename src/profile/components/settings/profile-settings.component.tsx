import Card from "react-bootstrap/esm/Card"
import { User } from "../../../users/types/user.type"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import { useTranslation } from "react-i18next"

type ProfileSettingsProps = {
    user: User,
    userT: Record<string, string>
}
export default function ProfileSettings({ user, userT }: ProfileSettingsProps) {
    const { t } = useTranslation("profile", { keyPrefix: "settings" });
    const handleChangeLanguage = () => {
        alert("Not implemented")
    }

    const handleChangeTheme = () => {
        alert("Not implemented")
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <i className="bi bi-gear me-3"></i>
                    {t("title")}
                </Card.Title>
                <ListGroup variant="flush">

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("language.label")}
                        value={userT[user.lang]}
                        onClick={handleChangeLanguage}
                    />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("theme.label")}
                        value={userT[user.theme]}
                        onClick={handleChangeTheme}
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )

}