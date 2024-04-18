import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem, { ListGroupItemType } from "../../../common/components/list-group-item/list-group-item.component";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ProfileUpdateAvatarModal from "../update-avatar-modal/profile-update-avatar-modal.component";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { getProfileAvatar } from "../../helpers/get-profile-avatar";
import { getProfileFullname } from "../../helpers/get-profile-full-name";
import { getFormatDate } from "../../../common/helpers/get-format-date";
import { useDispatch } from "react-redux";
import { setSelectedAvatar } from "../../../avatar/features/avatar.slice";

export default function ProfileBasicInfo() {

    const { profile, profileTranslations: profileT } = useAppSelector(state => state.profile);
    const { t } = useTranslation("profile", { keyPrefix: "basic_info" });
    const avatar = getProfileAvatar(profile.avatarUrl);
    const fullName = getProfileFullname(profile.firstName, profile.lastName);
    const updatedAt = getFormatDate(profile.updatedAt);
    const dispatch = useDispatch();
    const [showAvatarModal, setShowAvatarModal] = useState(false);

    const handleChangeAvatar = () => {
        dispatch(setSelectedAvatar({ url: avatar }));
        setShowAvatarModal(true);
    }

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

                        <ListGroupItem
                            type={ListGroupItemType.AVATAR}
                            label={t("avatar.label")}
                            value={t("avatar.value")}
                            imageUrl={avatar}
                            onClick={handleChangeAvatar}
                        />

                        <ListGroupItem
                            type={ListGroupItemType.DEFAULT}
                            label={t("username.label")}
                            value={profile.username}
                            hidden />

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

            <ProfileUpdateAvatarModal show={showAvatarModal} onHide={() => setShowAvatarModal(false)} />

        </>
    )
}