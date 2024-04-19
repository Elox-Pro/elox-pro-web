import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { getProfileFullname } from "../../helpers/get-profile-full-name";
import { getFormatDate } from "../../../common/helpers/get-format-date";
import ListGroupItemAvatar from "../list-group-item-avatar/list-group-item-avatar.component";
import ListGroupItemDefault from "../../../common/components/list-group-item-default/list-group-item-default.component";

export default function ProfileBasicInfo() {

    const { profile, profileTranslations: profileT } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "basic-info" });
    const fullName = getProfileFullname(profile.firstName, profile.lastName);
    const updatedAt = getFormatDate(profile.updatedAt);


    const handleChangeName = () => {
        alert("Not implemented")
    }

    const handleChangeGender = () => {
        alert("Not implemented")
    }

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
                            value={profile.username}
                        />

                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("role.label")}
                            value={profile.role && profileT[profile.role]}
                            hidden />


                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("name.label")}
                            value={fullName}
                            onClick={handleChangeName}
                        />

                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("gender.label")}
                            value={profile.gender && profileT[profile.gender] || "N/A"}
                            onClick={handleChangeGender}
                        />

                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("updated_at.label")}
                            value={updatedAt}
                            hidden />

                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )
}