import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { getFormatDate } from "../../../common/helpers/get-format-date";
import ListGroupItemAvatar from "../list-group-item-avatar/list-group-item-avatar.component";
import ListGroupItemDefault from "../../../common/components/list-group-item-default/list-group-item-default.component";
import ListGroupItemFullName from "../list-group-item-full-name/list-group-item-full-name.component";
import ListGroupItemGender from "../list-group-item-gender/list-group-item-gender.component";

export default function ProfileBasicInfo() {
    const { profile, profileTranslations } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "basic-info" });

    if (profile === null || profileTranslations === null) {
        return null;
    }

    const username = profile.username;
    const role = profile.role ? profileTranslations[profile.role] : null;
    const updatedAt = getFormatDate(profile.updatedAt);

    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                        <i className="bi bi-person-circle me-3"></i>
                        {t("title")}
                    </Card.Title>
                    <ListGroup variant="flush">

                        <ListGroupItemAvatar />

                        <ListGroupItemDefault
                            label={t("username.label")}
                            value={username}
                        />

                        <ListGroupItemDefault
                            label={t("role.label")}
                            value={role}
                        />

                        <ListGroupItemFullName />

                        <ListGroupItemGender />

                        <ListGroupItemDefault
                            label={t("updated-at.label")}
                            value={updatedAt}
                        />

                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )
}