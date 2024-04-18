import Card from "react-bootstrap/esm/Card"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../app/hooks/app.hooks"

export default function ProfileSettings() {
    const { profile, profileTranslations: profileT } = useAppSelector(state => state.profile);
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
                        value={profile?.lang && profileT[profile.lang]}
                        onClick={handleChangeLanguage}
                    />

                    <ListGroupItem
                        type={ListGroupItemType.DEFAULT}
                        label={t("theme.label")}
                        value={profile?.theme && profileT[profile.theme]}
                        onClick={handleChangeTheme}
                    />

                </ListGroup>
            </Card.Body>
        </Card>
    )

}